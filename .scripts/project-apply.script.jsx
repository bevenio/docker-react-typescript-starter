const fs = require('fs')
const path = require('path')
const mustache = require('mustache')

const packageConfiguration = require('./../package.json')
const projectConfiguration = require('./../project.json')

// Read templates and write files
const readFileTemplate = (filePath) => {
  return fs.readFileSync(path.resolve(__dirname, filePath), {
    encoding: 'utf8',
    flag: 'r',
  })
}

const writeFile = (filePath, file, configuration) => {
  fs.writeFile(
    path.resolve(__dirname, filePath),
    mustache.render(file, configuration),
    { flag: 'w' },
    (error) => {
      if (error) {
        throw error
      }
    }
  )
}

// "Docker-compose" file generation
const generateDockerFiles = () => {
  const dockerFiles = ['deployment', 'development', 'production']

  dockerFiles
    .map((type) => {
      return {
        type,
        file: readFileTemplate(
          `./../.docker/template.docker-compose.${type}.yml`
        ),
      }
    })
    .forEach(({ type, file }) => {
      writeFile(
        `./../.docker/docker-compose.${type}.yml`,
        file,
        projectConfiguration
      )
    })
}

// "LICENSE" file generation
const generateLicenseFile = () => {
  const licenseFileTemplate = readFileTemplate('./../.license/template.LICENSE')
  const currentYear = new Date().getFullYear()
  const configurationWithYear = {
    ...packageConfiguration,
    ...{ year: currentYear },
  }
  writeFile('./../LICENSE', licenseFileTemplate, configurationWithYear)
}

// Run
generateDockerFiles()
generateLicenseFile()
