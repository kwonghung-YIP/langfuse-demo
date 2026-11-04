#!/bin/bash

docker compose down
docker rm -f `docker ps -qa`
docker volume rm `docker volume ls -q`