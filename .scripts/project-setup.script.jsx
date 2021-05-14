const fs = require('fs')
const path = require('path')

const DEFAULT_CONFIGURATION = {
  local_machine: {
    port: 8080,
  },
  remote_machines: {
    remote_1: {
      user: 'root',
      host: 'bevenio.org',
      port: 22,
      path: '/home/remote_1',
      ssh_key: '<insert-private-key-path-here>',
    },
  },
}

const saveDefaultConfigurationIfDoesntExist = () => {
  const configurationString = JSON.stringify(DEFAULT_CONFIGURATION, null, '\t')
  fs.writeFileSync(
    path.resolve(__dirname, './../project.json'),
    configurationString,
    { flag: 'wx' },
    (error) => {
      if (error && error.code !== 'EEXIST') throw error
    }
  )
}

saveDefaultConfigurationIfDoesntExist()
