default: docker-build docker-start graphql-query

.PHONY: docker-build
docker-build:
	docker-compose build

.PHONY: docker-start
docker-start:
	docker-compose up -d

.PHONY: docker-down
docker-down:
	docker-compose down --remove-orphans

.PHONY: docker-restart
docker-restart: docker-down docker-start

.PHONY: graphql-query
graphql-query:
	./scripts/graphql-query.sh