#!/bin/bash

# Check if the secret file exists and read it into the environment variable
if [ -f /run/secrets/langfuse-secret-key ]; then
    export LANGFUSE_SECRET_KEY=$(cat /run/secrets/langfuse-secret-key)
fi
if [ -f /run/secrets/langfuse-public-key ]; then
    export LANGFUSE_PUBLIC_KEY=$(cat /run/secrets/langfuse-public-key)
fi

export BASIC_AUTH=`echo -n "$LANGFUSE_PUBLIC_KEY:$LANGFUSE_SECRET_KEY" | base64 -w 0`

export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Basic ${BASIC_AUTH},x-langfuse-ingestion-version=4"

