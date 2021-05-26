# docker-react

![Lint](https://github.com/bevenio/docker-react/actions/workflows/nodejs_lint.yml/badge.svg?event=push)
![Test](https://github.com/bevenio/docker-react/actions/workflows/nodejs_test.yml/badge.svg?event=push)
![Build](https://github.com/bevenio/docker-react/actions/workflows/nodejs_build.yml/badge.svg?event=push)

## General

### Setting up this project

```zsh
make setup
```

### Installing dependencies

> Note: The dependencies in the _node_modules_ directory are not the same as those used by the Docker environment. The reason they need to be installed outside of docker is the **VSCode extension ESlint**, which expects a local version of **ESlint**.

```zsh
make install
```

### Serving and developing locally

```zsh
make serve
```

### Executing commands inside the docker environment

In able to execute commands like _"npm audit fix"_ inside the docker environment you have to pass them to the _execute_ script as a parameter.

```zsh
make execute command="<actual-command>"
```

### Linting this project

For running the **eslint** linter over all files, execute this:

```zsh
make lint
```

In **VS Code** the linter will run automatically if you install the recommended extensions. An autofix-on-save feature is included.

### Syncing this project to a remote machine

The machine names are saved inside of the _project.json_ file. Inside this file you can add and remove remote machines and settings.

```zsh
make sync name=<name-of-machine>
```

### Testing this project

For testing we use the frameworks **jest**, **enzyme** and **react-test-renderer**.
In order to run a test on a single _\*.spec.jsx_ file execute the following:

```zsh
make test pattern=<filename>.spec.jsx
```

For running all tests, execute this:

```zsh
make test
```

For running all tests on a CI-System, execute this:

```zsh
make test-noui
```

## Project architecture

### Rough representation

```dir
src
|   index.html
│   index.jsx
│   settings.jsx
│
└───components
│   └───basic
│   └───composed
│   └───pages
│
└───worker
│   │   worker.jsx
│   └───workers
│
└───router
│   │   router.jsx
│   └───routes
│   └───utility
│
└───store
│   │   store.jsx
│   └───entries
│   └───utility
│
└───assets
└───services
```

## Project configuration

After running _"make setup"_ a _project.json_ file will be generated. In this file you can configure attributes like the local machine port or remote machines in order to sync your local project.

### Local machine

| Attribute | Purpose                                                       |
| --------- | ------------------------------------------------------------- |
| port      | The port your app will be served on (<http://localhost:XXXX>) |

### Remote machines

| Attribute | Purpose                                                       |
| --------- | ------------------------------------------------------------- |
| user      | The user you want to use to execute ssh commands with         |
| host      | The server you want to sync your files to                     |
| port      | The ssh port of your server                                   |
| path      | The location you want to sync your files to                   |
| ssh_key   | The location of your ssh key to establish a secure connection |
