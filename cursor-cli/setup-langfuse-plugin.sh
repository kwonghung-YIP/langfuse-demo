#!/bin/bash

# Check if the secret file exists and read it into the environment variable
if [ -f /run/secrets/langfuse-secret-key ]; then
    export LANGFUSE_SECRET_KEY=$(cat /run/secrets/langfuse-secret-key)
fi
if [ -f /run/secrets/langfuse-public-key ]; then
    export LANGFUSE_PUBLIC_KEY=$(cat /run/secrets/langfuse-public-key)
fi
# source $NVM_DIR/nvm.sh

npm install -g ~/.cursor/plugins/local/langfuse-observability

#echo "Waiting for langfuse server started..."
#sleep 30s

langfuse-cursor-hook setup \
  --hooks \
  --public-key ${LANGFUSE_PUBLIC_KEY} \
  --secret-key ${LANGFUSE_SECRET_KEY} \
  --base-url $LANGFUSE_BASE_URL

langfuse-cursor-hook status

#ls ~/.cursor -l

jq -s '.[0] + .[1]' ~/.cursor/langfuse.json ~/.cursor/langfuse.default.json > ~/.cursor/langfuse.tmp.json
mv ~/.cursor/langfuse.tmp.json ~/.cursor/langfuse.json 

jq . ~/.cursor/langfuse.json