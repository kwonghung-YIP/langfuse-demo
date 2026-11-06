# steps to init project

```bash
npm init -y
npm install --save-dev typescript@^6.0.3
npx tsc --init
npm install --save-dev tsx 
npm install --save-dev eslint @eslint/js typescript-eslint @types/node
npm install @cursor/sdk @langfuse/tracing @langfuse/otel @langfuse/client @opentelemetry/sdk-node@^0.223.0 dotenv
npm install @opentelemetry/exporter-trace-otlp-http
```

```bash
npx tsc
node dist/index.js
npx tsx src/index.ts
npx eslint .
```

```bash
LANGFUSE_SECRET_KEY=$(cat ../secrets/langfuse-secret-key.txt)
LANGFUSE_PUBLIC_KEY=$(cat ../secrets/langfuse-public-key.txt)
BASIC_AUTH=`echo -n "$LANGFUSE_PUBLIC_KEY:$LANGFUSE_SECRET_KEY" | base64 -w 0`
AUTH_HEADERS="Authorization=Basic ${BASIC_AUTH},x-langfuse-ingestion-version=4"

echo ${AUTH_HEADERS}

cat << 'EOF' > span-sample.json
{
    "resourceSpans": [
      {
        "resource": {
          "attributes": [
            {
              "key": "service.name",
              "value": { "stringValue": "curl-test-service" }
            }
          ]
        },
        "scopeSpans": [
          {
            "scope": {
              "name": "manual-curl-test"
            },
            "spans": [
              {
                "traceId": "11111111111111111111111111111111",
                "spanId": "2222222222222222",
                "name": "test-otlp-span",
                "kind": 1,
                "startTimeUnixNano": "'$(date +%s%N)'",
                "endTimeUnixNano": "'$(date +%s%N)'",
                "status": {
                  "code": 1
                }
              }
            ]
          }
        ]
      }
    ]
  }
EOF

curl -v http://localhost:3000/api/public/health

curl -v http://localhost:3000/api/public/projects \
  -u "$LANGFUSE_PUBLIC_KEY:$LANGFUSE_SECRET_KEY"

curl -v -X POST "http://localhost:3000/api/public/otel/v1/traces" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Content-Type: application/json" \
  -H "x-langfuse-ingestion-version: 4" \
  -d '{}'

curl -v -X POST "http://localhost:3000/api/public/otel/v1/traces" \
  -u "$LANGFUSE_PUBLIC_KEY:$LANGFUSE_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "resourceSpans": [
      {
        "resource": {
          "attributes": [
            {
              "key": "service.name",
              "value": { "stringValue": "curl-test-service" }
            }
          ]
        },
        "scopeSpans": [
          {
            "scope": {
              "name": "manual-curl-test"
            },
            "spans": [
              {
                "traceId": "11111111111111111111111111111111",
                "spanId": "2222222222222222",
                "name": "test-otlp-span",
                "kind": 1,
                "startTimeUnixNano": "'$(date +%s%N)'",
                "endTimeUnixNano": "'$(date +%s%N)'",
                "status": {
                  "code": 1
                }
              }
            ]
          }
        ]
      }
    ]
  }'
```