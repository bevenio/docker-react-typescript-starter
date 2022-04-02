### MAKEFILE VARIABLES
RUN_DOCKER_COMMAND := docker compose -f ./.docker/docker-compose.commands.yml run --rm
RUN_DOCKER_DEVELOPMENT := docker compose -f ./.docker/docker-compose.development.yml -p development-container-client up --remove-orphans
RUN_DOCKER_PRODUCTION := docker compose -f ./.docker/docker-compose.production.yml -p production-container-client up --remove-orphans

### COMMANDS FOR LOCALLY TESTING, LINTING
lint:
	ARGS="" $(RUN_DOCKER_COMMAND) lint 
test:
	ARGS="$(pattern)" $(RUN_DOCKER_COMMAND) test

### COMMANDS FOR REMOTELY TESTING
test-noui:
	ARGS="" $(RUN_DOCKER_COMMAND) test_noui

### SETTING UP ENVIRONMENT FOR DEVELOPMENT
setup:
	docker volume create nodemodules && make install && make prepare

### DEVELOPMENT COMMANDS
prepare:
	ARGS="" $(RUN_DOCKER_COMMAND) prepare
install:
	ARGS="" $(RUN_DOCKER_COMMAND) install && npm ci
execute:
	ARGS="$(command)" $(RUN_DOCKER_COMMAND) execute_command
serve:
	make prepare && $(RUN_DOCKER_DEVELOPMENT)
build:
	ARGS="" make prepare && $(RUN_DOCKER_COMMAND) build_development

### PRODUCTION COMMANDS
serve-production:
	make prepare && $(RUN_DOCKER_PRODUCTION)
build-production:
	ARGS="" make prepare && $(RUN_DOCKER_COMMAND) build_production

### SYNC/REMOTE COMMANDS
sync:
	ARGS="$(name)" $(RUN_DOCKER_COMMAND) sync_repository

### RELEASE COMMANDS
release:
	make prepare && docker build -t docker-react:build . -f ./.docker/dockerfile.deployment --rm && docker save docker-react:build -o ./build/docker-react.image.tar