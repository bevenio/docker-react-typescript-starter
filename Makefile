### COMMANDS FOR LOCALLY TESTING, LINTING
lint:
	ARGS="" docker compose -f ./.docker/docker-compose.commands.yml run --rm lint 
test:
	ARGS="$(pattern)" docker compose -f ./.docker/docker-compose.commands.yml run --rm test

### COMMANDS FOR REMOTELY TESTING
test-noui:
	ARGS="" docker compose -f ./.docker/docker-compose.commands.yml run --rm test_noui

### SETTING UP ENVIRONMENT FOR DEVELOPMENT
setup:
	docker volume create nodemodules && make install && make prepare

### DEVELOPMENT COMMANDS
prepare:
	ARGS="" docker compose -f ./.docker/docker-compose.commands.yml run --rm prepare
install:
	ARGS="" docker compose -f ./.docker/docker-compose.commands.yml run --rm install && npm ci
execute:
	ARGS="$(command)" docker compose -f ./.docker/docker-compose.commands.yml run --rm execute_command
serve:
	make prepare && docker compose -f ./.docker/docker-compose.development.yml -p development-container-client up --remove-orphans
build:
	ARGS="" make prepare && docker compose -f ./.docker/docker-compose.commands.yml run --rm build_development

### PRODUCTION COMMANDS
serve-production:
	make prepare && docker compose -f ./.docker/docker-compose.production.yml -p production-container-client up --remove-orphans
build-production:
	ARGS="" make prepare && docker compose -f ./.docker/docker-compose.commands.yml run --rm build_production

### SYNC/REMOTE COMMANDS
sync:
	ARGS="$(name)" docker compose -f ./.docker/docker-compose.commands.yml run --rm sync_repository

### RELEASE COMMANDS
release:
	ARGS="" make build-production && cp -f ./.docker/docker-compose.deployment.yml dist/docker-compose.yml