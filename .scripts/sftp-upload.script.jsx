/* eslint-disable no-console */

// Project configuration file
const projectConfigurationFile = require('../project.json')

// Npm module imports
const fs = require('fs')
const path = require('path')
const Client = require('ssh2-sftp-client')
const { Gaze } = require('gaze')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})

const consoleArguments = process.argv.slice(2)

const filesNotToUpload = fs.readFileSync('.gitignore', 'utf8').replace(/\r\n/g, '\r').replace(/\n/g, '\r').split(/\r/)

filesNotToUpload.push('.git')
filesNotToUpload.push('.authorization')

const filterRegex = new RegExp(`^(?!.*(${filesNotToUpload.join('|')})).*$`)

const isMachineSaved = (name, projectConfiguration) => {
  return !!projectConfiguration && projectConfiguration.remote_machines[name]
}

const createSFTPConnection = (name, projectConfiguration) => {
  return new Promise((resolve, reject) => {
    const sftp = new Client()

    sftp
      .connect({
        host: projectConfiguration.remote_machines[name].host,
        port: projectConfiguration.remote_machines[name].port,
        username: projectConfiguration.remote_machines[name].user,
        privateKey: fs.readFileSync(path.resolve(projectConfiguration.remote_machines[name].ssh_key)),
      })
      .then(resolve.bind(null, sftp))
      .catch(reject)
  })
}

const uploadComplete = (sftp, name, projectConfiguration) => {
  const srcDir = path.join(__dirname, '../')
  const distDir = projectConfiguration.remote_machines[name].path

  sftp
    .uploadDir(srcDir, distDir, filterRegex)
    .then(() => {
      console.log('[SYNC] Complete repository synchronized')
    })
    .catch((error) => {
      throw new Error(error)
    })
}

const watchAndUpload = (sftp, name, projectConfiguration) => {
  const srcDir = path.join(__dirname, '../')
  const distDir = projectConfiguration.remote_machines[name].path

  const ignoreList = filesNotToUpload.map((file) => {
    return `!${file}/**/*`
  })

  const gaze = new Gaze(['**/*', '**/.*', '.**/.*', '.**/*', ...ignoreList])

  gaze.on('all', (event, localPath) => {
    const relativePath = localPath.replace(srcDir, '')
    const remotePath = `${distDir}/${relativePath}`
    switch (event) {
      case 'added': {
        console.log(`[SYNC] Synchronized ${relativePath} (create)`)
        sftp.fastPut(localPath, remotePath)
        break
      }
      case 'changed': {
        console.log(`[SYNC] Synchronized ${relativePath} (update)`)
        sftp.fastPut(localPath, remotePath)
        break
      }
      case 'deleted': {
        console.log(`[SYNC] Synchronized ${relativePath} (delete)`)
        sftp.delete(remotePath)
        break
      }
      default:
        break
    }
  })
}

const uploadViaSFTP = (name, projectConfiguration) => {
  if (isMachineSaved(name, projectConfiguration)) {
    try {
      createSFTPConnection(name, projectConfiguration)
        .then((sftp) => {
          console.log('[SYNC] Starting synchronization')
          uploadComplete(sftp, name, projectConfiguration)
          watchAndUpload(sftp, name, projectConfiguration)
        })
        .catch((error) => {
          console.error(error)
          process.exit(1)
        })
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  } else {
    console.error(`No machine [${name}] found inside of project.json`)
    process.exit(1)
  }
}

uploadViaSFTP(consoleArguments[0], projectConfigurationFile)

readline.question(`[SYNC] Press "Enter" to stop synchronization \n`, (/* input */) => {
  readline.close()
  console.log('[SYNC] Stopped synchronization')
  process.exit(0)
})
