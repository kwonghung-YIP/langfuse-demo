import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
dotenv.config({ path: 'langfuse.env' });
/*
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
*/
import { configureGlobalLogger, LogLevel } from "@langfuse/core";

configureGlobalLogger({ level: LogLevel.DEBUG });

import { LangfuseSpanProcessor } from "@langfuse/otel";
import { startActiveObservation, startObservation } from "@langfuse/tracing";
import { NodeSDK } from "@opentelemetry/sdk-node";

const spanProcessor = new LangfuseSpanProcessor();
/*
const spanProcessor = new LangfuseSpanProcessor({
    publicKey: process.env.LANGFUSE_PUBLIC_KEY??"",
    secretKey: process.env.LANGFUSE_SECRET_KEY??"",
    baseUrl: process.env.LANGFUSE_BASE_URL??"",
});
*/

const oTelSdk = new NodeSDK({
    spanProcessors: [spanProcessor], 
});

oTelSdk.start();

async function firstTrace() {
    await startActiveObservation("my-first-trace", async (span) => {
        span.update({
            input: "my input",
            output: "my output",
        });
    });

    await oTelSdk.shutdown();
}

async function greeting() {
    await startActiveObservation("greeting", async (span) => {
        const prompt = "Hello Agent!";


        span.update({input: prompt, });
        const generation = startObservation(
            "llm-call",
            { model: "", input: [{ role: "user", content: prompt}]},
            { asType: "generation"},
        );
        generation.update({ output: { content: "Hello! I am a agent" } }).end();
        span.update({ output: "Answered." });        
    });

    await oTelSdk.shutdown();
}

//firstTrace().catch(console.log);//.finally(oTelSdk.shutdown);
greeting().catch(console.log).finally(() => oTelSdk.shutdown());
