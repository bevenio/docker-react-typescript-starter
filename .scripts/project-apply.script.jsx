const fs = require('fs')
const path = require('path')
const mustache = require('mustache')

const projectConfiguration = require('./../project.json')

const generateDockerFiles = () => {
  const dockerComposeDevelopmentTemplate = fs.readFileSync(
    path.resolve(
      __dirname,
      './../.docker/template.docker-compose.development.yml'
    ),
    { encoding: 'utf8', flag: 'r' }
  )

  const dockerComposeProductionTemplate = fs.readFileSync(
    path.resolve(
      __dirname,
      './../.docker/template.docker-compose.production.yml'
    ),
    { encoding: 'utf8', flag: 'r' }
  )

  // Save development docker compose
  fs.writeFile(
    path.resolve(__dirname, './../.docker/docker-compose.development.yml'),
    mustache.render(
      dockerComposeDevelopmentTemplate,
      projectConfiguration.local_machine
    ),
    { flag: 'w' },
    (error) => {
      if (error) {
        throw error
      }
    }
  )

  // Save production docker compose
  fs.writeFile(
    path.resolve(__dirname, './../.docker/docker-compose.production.yml'),
    mustache.render(
      dockerComposeProductionTemplate,
      projectConfiguration.local_machine
    ),
    { flag: 'w' },
    (error) => {
      if (error) {
        throw error
      }
    }
  )
}

generateDockerFiles()
