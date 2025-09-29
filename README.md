Effect TS Tracing on Cloudflare Workers
=======================================

Let's start with the Gotchas.

## Gotchas

### CF Worker !== node

For me, this stopped any of the basic implementations working from Effect TS docs:

```
const NodeSdkLive = NodeSdk.layer(() => ({
  resource: { serviceName: "example" },
  // Export span data to the console
  spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter())
}))
```

Won't work because both `BatchSpanProcessor` and `ConsoleSpanExporter` are incompatible with Cloudflare Workers (as far as I can tell).

### `ConsoleSpanExporter`

Didn't print anything inside my react-router app.

### `BatchSpanProcessor`

Essential for production, this Span Processor will colled spans together before sending them to your OpenTelemetry backend.

I couldn't get it to work with Cloudflare Workers out of the box.

## Some light at the end of the tunnel

The [evanderkoogh/otel-cf-workers repo](https://github.com/evanderkoogh/otel-cf-workers) gets Workers working out of the box. So the only challenge is making these components work with Effect.
