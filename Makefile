basic:
	echo "Hello"

start:
  docker-compose -f docker-compose.yml up -d

stop:
	docker-compose down