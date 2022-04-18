const fs = require('fs')
const path = require('path')
const mustache = require('mustache')

// Root path
const rootPath = path.resolve(__dirname, '../')

// Loading genrc

const genrcPath = path.resolve(rootPath, './.genrc')
const genrcFound = fs.existsSync(genrcPath)

if (!genrcFound) {
  console.error('You need to define a ".genrc" file in the projects root directory')
  process.exit(1)
}

const genrc = JSON.parse(fs.readFileSync(genrcPath))

// Project generation paths and configuration (execution in order)

const dependencyFiles = genrc.sources
const filesToGenerate = genrc.replacements

// Generation Functions

const isProjectFileGenerated = () => {
  return fs.existsSync(path.resolve(rootPath, './project.json'))
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
        return [id, require(path.resolve(rootPath, from))]
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
  const fromPath = path.resolve(rootPath, from)
  const toPath = path.resolve(rootPath, to)
  const writeConfiguration = overwriteFile ? { flag: 'w' } : { flag: 'wx' }

  if (!overwriteFile && fs.existsSync(toPath)) {
    return false
  } else {
    const template = fs.readFileSync(fromPath, {
      encoding: 'utf8',
      flag: 'r',
    })
    fs.writeFileSync(path.resolve(rootPath, toPath), mustache.render(template, dependencies), writeConfiguration)
    return true
  }
}

const generateFiles = (overWriteAll) => {
  let dependencies = getDependencies()
  filesToGenerate.forEach((file) => {
    try {
      const overwriteFile = overWriteAll || !file.generateOnce
      const hasBeenGenerated = generateFile(file.from, file.to, dependencies, overwriteFile)
      console.log(hasBeenGenerated ? `Generated "${file.to}"` : `Skipping "${file.to}"`)
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
