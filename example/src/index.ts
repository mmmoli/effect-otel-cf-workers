import * as Tracing from "@mmmoli/effect-otel-workers";
import * as Effect from "effect/Effect";

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const program = Effect.fn("http.fetch")(function* () {
      yield* Effect.annotateCurrentSpan({
        msg: Tracing.msg,
      });
      yield* Effect.log(Tracing.msg);
      yield* Effect.sleep("500 millis");
      return new Response("Hello World!");
    });

    const runnable = program().pipe(Effect.provide(Tracing.NodeSdkLive));

    return Effect.runPromise(runnable);
  },
} satisfies ExportedHandler<Env>;
