import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server-side Sentry initialization

    Sentry.init({
      enabled: process.env.SENTRY_ENABLED !== "false",
      dsn: "https://b7a6ec1244110547c60ce963ba71419d@o4506742346678272.ingest.sentry.io/4506742348316672",
      tracesSampleRate: 1,
      debug: false,
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge runtime Sentry initialization

    Sentry.init({
      enabled: process.env.SENTRY_ENABLED !== "false",
      dsn: "https://b7a6ec1244110547c60ce963ba71419d@o4506742346678272.ingest.sentry.io/4506742348316672",
      tracesSampleRate: 1,
      debug: false,
    });
  }
}

// Export request error hook for error instrumentation
export const onRequestError = Sentry.captureRequestError;
