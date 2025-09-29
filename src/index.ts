import { NodeSdk } from "@effect/opentelemetry";
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
// import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

export const msg = "Hello World!";

class DebugConsoleSpanExporter extends ConsoleSpanExporter {
  export(spans: any, resultCallback: any) {
    console.log("Exporter called with spans:", spans);
    super.export(spans, resultCallback);
  }
}

export const NodeSdkLive = NodeSdk.layer(() => ({
  resource: { serviceName: "example" },
  spanProcessor: new SimpleSpanProcessor(new DebugConsoleSpanExporter()),
}));
