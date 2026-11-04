#!/bin/bash

docker compose \
  --profile copilot \
  --env-file .env --env-file demo.env \
  up \
  --build --detach --remove-orphans

docker compose \
  exec -it copilot-cli \
  bash -c "source setup-copilot-cli.sh && exec bash"