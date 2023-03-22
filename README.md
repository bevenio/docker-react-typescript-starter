# docker-react-typescript-starter

![Lint](https://github.com/bevenio/docker-react/actions/workflows/nodejs_lint.yml/badge.svg?event=push)
![Test](https://github.com/bevenio/docker-react/actions/workflows/nodejs_test.yml/badge.svg?event=push)
![Build](https://github.com/bevenio/docker-react/actions/workflows/nodejs_build.yml/badge.svg?event=push)

## General

### About

This project is a docker based starter repository aiming for enterprise solutions. The only dependencies needed are **docker** and **make** script support.

### Included Technologies/Libraries

- Node _LTS/18_
- React _18_
- Webpack _4_
- Redux
- Typescript
- EsLint
- Jest
- Axios
- React testing library
- Browser devtools

### Included Features

- PWA support
- Translation service
- Logging service
- Serviceworker caching
- Webworker support
- Sass support
- Static assets
- Conditional routing
- Redux localstorage syncing
- Lazy loading
- Serverless sharing state between browser windows
- File generation from templates with package.json and project.json data
- Development, production and test builds
- Github actions integration
- Hot module replacement
- VSCode integration
- Code linting and autoformatting
- Single docker image as output file

### Setting up this project

```zsh
make setup
```

### Installing dependencies

> Note: The dependencies in the node_modules directory are not the same as those used by the Docker environment. The reason they need to be installed outside of docker is the **VSCode extension ESlint**, which expects a local version of **ESlint**. This repository uses node 18.

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
make execute command=<actual-command>
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

For testing we use the frameworks **jest**, **react-testing-library** and **react-test-renderer**.
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
│   index.tsx
│   settings.ts
│
└───components
│   └───basic
│   └───composed
│   └───pages
│
└───router
│   │   router.tsx
│   │   routes.tsx
│   └───utility
│
└───store
│   │   store.ts
│   └───entries
│   └───utility
│
└───assets
└───hooks
└───services
└───types
```

### Common file types

| File name        | Purpose                                                      | Location                                       |
| ---------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| \*.scss          | A file that contains the styling for a component or the app  | assets / components                            |
| index.ts         | ts                                                           | An entrypoint to a service / component / store |
| \*.module.ts     | A file that contains one or multiple plain js modules        | no location restriction                        |
| \*.component.tsx | A file that contains one or multiple react components        | component directory                            |
| \*.service.ts    | A file that contains side-effect free business logic         | services directory                             |
| \*.sdk.ts        | A file that interacts with a third party library or software | components / services                          |
| \*.route.tsx     | A file that contains one or multiple routes                  | router directory                               |
| \*.worker.ts     | A file that contains a webworker                             | components / services                          |
| \*types.ts       | A file that contains typescript definitions                  | no location restriction                        |
| \*.d.ts          | A file that contains global typescript definitions           | no location restriction                        |

### Common directory types

| Directory name        | Purpose                                 | Location                |
| --------------------- | --------------------------------------- | ----------------------- |
| _\*/\*\*/components/_ | A directory containing react components | _src/components_        |
| _\*/\*\*/modules/_    | A directory containing plain js modules | no location restriction |
| _\*/\*\*/utility/_    | A directory containing utility modules  | no location restriction |

## Project configuration

After running _"make setup"_ a _project.json_ file will be generated. In this file you can configure attributes like the local machine port or remote machines in order to sync your local project.

### General Properties

| Attribute    | Purpose                                                    |
| ------------ | ---------------------------------------------------------- |
| node_version | The node version that will be used throughout this project |

### Local Properties

| Attribute | Purpose                                                       |
| --------- | ------------------------------------------------------------- |
| port      | The port your app will be served on (<http://localhost:XXXX>) |

### Remote Properties

| Attribute | Purpose                                                       |
| --------- | ------------------------------------------------------------- |
| user      | The user you want to use to execute ssh commands with         |
| host      | The server you want to sync your files to                     |
| port      | The ssh port of your server                                   |
| path      | The location you want to sync your files to                   |
| ssh_key   | The location of your ssh key to establish a secure connection |
