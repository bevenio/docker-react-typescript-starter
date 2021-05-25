const fs = require('fs')
const path = require('path')
const mustache = require('mustache')

const projectConfiguration = require('./../project.json')

const readDockerFile = (type) => {
  return fs.readFileSync(
    path.resolve(__dirname, `./../.docker/template.docker-compose.${type}.yml`),
    { encoding: 'utf8', flag: 'r' }
  )
}

const writeDockerFile = (type, file, configuration) => {
  fs.writeFileSync(
    path.resolve(__dirname, `./../.docker/docker-compose.${type}.yml`),
    mustache.render(file, configuration),
    { flag: 'w' },
    (error) => {
      if (error) {
        throw error
      }
    }
  )
}

const generateDockerFiles = () => {
  const dockerFiles = ['deployment', 'development', 'production']

  dockerFiles
    .map((type) => {
      return {
        type,
        file: readDockerFile(type),
      }
    })
    .forEach(({ type, file }) => {
      writeDockerFile(type, file, projectConfiguration)
    })
}

generateDockerFiles()
