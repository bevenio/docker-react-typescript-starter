const fs = require('fs')
const path = require('path')
const mustache = require('mustache')

// Project generation paths and configuration (execution in order)

const dependencyFiles = [
  { id: 'project', from: '../project.json' },
  { id: 'package', from: '../package.json' },
]

const filesToGenerate = [
  { from: '../.templates/template.project.json', to: '../project.json', overwrite: false },
  { from: '../.templates/template.LICENSE', to: '../LICENSE', overwrite: true },
  { from: '../.templates/template.docker-compose.commands.yml', to: '../.docker/docker-compose.commands.yml', overwrite: true },
  { from: '../.templates/template.docker-compose.deployment.yml', to: '../.docker/docker-compose.deployment.yml', overwrite: true },
  { from: '../.templates/template.docker-compose.development.yml', to: '../.docker/docker-compose.development.yml', overwrite: true },
  { from: '../.templates/template.docker-compose.production.yml', to: '../.docker/docker-compose.production.yml', overwrite: true },
]

// Generation Functions

const isProjectFileGenerated = () => {
  return fs.existsSync(path.resolve(__dirname, '../project.json'))
}

const getMetadata = () => {
  return {
    year: new Date().getFullYear(),
  }
}

const getDependencies = () => {
  if (isProjectFileGenerated()) {
    const dependencyFileObject = Object.fromEntries(
      dependencyFiles.map(({ id, from }) => {
        return [id, require(path.resolve(__dirname, from))]
      })
    )
    return {
      metadata: getMetadata(),
      ...dependencyFileObject,
    }
  }
  return {}
}

const hasGeneratedADependenyFile = (file) => {
  return !!dependencyFiles.find((dependencyFile) => {
    return dependencyFile.from === file.to
  })
}

const generateFile = (from, to, dependencies, overwriteFile) => {
  const fromPath = path.resolve(__dirname, from)
  const toPath = path.resolve(__dirname, to)
  const writeConfiguration = overwriteFile ? { flag: 'w' } : { flag: 'wx' }

  if (!overwriteFile && fs.existsSync(toPath)) {
    return false
  } else {
    const template = fs.readFileSync(fromPath, {
      encoding: 'utf8',
      flag: 'r',
    })
    fs.writeFileSync(path.resolve(__dirname, toPath), mustache.render(template, dependencies), writeConfiguration)
    return true
  }
}

const generateFiles = (overWriteAll) => {
  let dependencies = getDependencies()
  filesToGenerate.forEach((file) => {
    try {
      const overwriteFile = overWriteAll || file.overwrite
      const hasBeenGenerated = generateFile(file.from, file.to, dependencies, overwriteFile)
      console.log(hasBeenGenerated ? `Generated "${file.to}"` : `Skipped "${file.to}"`)
      dependencies = hasGeneratedADependenyFile(file) ? getDependencies() : dependencies
    } catch (error) {
      console.error(`Could not generate file ${file.to}`)
      throw error
    }
  })
}

// Run
generateFiles(false)
process.exit(0)
