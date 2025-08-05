export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server-side Sentry initialization
    const Sentry = await import("@sentry/nextjs");

    Sentry.init({
      enabled: process.env.SENTRY_ENABLED !== "false",
      dsn: "https://b7a6ec1244110547c60ce963ba71419d@o4506742346678272.ingest.sentry.io/4506742348316672",
      tracesSampleRate: 1,
      debug: false,
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge runtime Sentry initialization
    const Sentry = await import("@sentry/nextjs");

    Sentry.init({
      enabled: process.env.SENTRY_ENABLED !== "false",
      dsn: "https://b7a6ec1244110547c60ce963ba71419d@o4506742346678272.ingest.sentry.io/4506742348316672",
      tracesSampleRate: 1,
      debug: false,
    });
  }
}
