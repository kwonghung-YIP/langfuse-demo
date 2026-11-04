```bash
docker compose \
  --env-file demo.env \
  up
```

```bash
docker compose \
  --env-file demo.env \
  up \
  --build --detach --remove-orphans

docker compose \
  exec -it cursor-cli bash

docker compose \
  exec -it copilot-cli bash
```

## Clear up commands
```bash
docker compose down
docker rm -f `docker ps -qa`
docker volume rm `docker volume ls -q`
```

# Reference

- [Copilot sub-agent custom configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [VS Code - Monitor agent usage with OpenTelemetry](https://code.visualstudio.com/docs/agents/guides/monitoring-agents)

