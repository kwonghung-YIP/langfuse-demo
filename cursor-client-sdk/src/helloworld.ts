import { Agent } from "@cursor/sdk";

const agent = await Agent.create({
  apiKey: process.env.CURSOR_API_KEY!,
  model: { id: "claude-haiku-5-5" },
  local: { cwd: process.cwd() },
});

const run = await agent.send("Good Afternoon agent!");

for await (const event of run.stream()) {
  console.log(event);
}