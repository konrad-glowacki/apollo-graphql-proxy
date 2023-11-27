basic:
	echo "Hello"

.PHONY: docker-build
docker-build:
	docker-compose build

start:
	docker-compose -f docker-compose.yml up -d

.PHONY: docker-down
docker-down:
	docker-compose down --remove-orphans