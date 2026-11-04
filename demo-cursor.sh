#!/bin/bash

docker compose \
  --profile cursor \
  --env-file .env --env-file demo.env \
  up \
  --build --detach --remove-orphans

docker compose \
  exec -it cursor-cli \
  bash -c "source /root/.nvm/nvm.sh && setup-langfuse-plugin.sh && exec bash"
