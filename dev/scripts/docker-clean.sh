#!/bin/bash
docker context use remote
docker stop $(docker ps -q)
docker ps -q
docker ps -a -q
docker images -q
docker volume prune -f
docker network prune -f
docker system prune -a -f --volumes

