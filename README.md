# docker-react

![Test](https://github.com/bevenio/docker-react/actions/workflows/nodejs_test.yml/badge.svg?event=push)
![Lint](https://github.com/bevenio/docker-react/actions/workflows/nodejs_lint.yml/badge.svg?event=push)

## Setting up this project

```zsh
make setup
```

## Installing dependencies

```zsh
make install
```

## Executing commands inside the docker environment

In able to execute commands like _"npm audit fix"_ inside the docker environment you have to pass them to the _execute_ script as a parameter.

```zsh
make execute command="<actual-command>"
```

## Linting this project

For running the **eslint** linter over all files, execute this:

```zsh
make lint
```

In **VS Code** the linter will run automatically if you install the recommended extensions. An autofix-on-save feature is included.

## Syncing this project to a remote machine

The machine names are saved inside of the _project.json_ file. Inside this file you can add and remove remote machines and settings.

```zsh
make sync name=<name-of-machine>
```

## Testing this project

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
