basic:
	echo "Hello"

.PHONY: docker-build
docker-build:
	docker-compose build

.PHONY: docker-start
docker-start:
	docker-compose up -d

.PHONY: docker-down
docker-down:
	docker-compose down --remove-orphans

.PHONY: graphql-query
graphql-query:
	./scripts/graphql-query.sh