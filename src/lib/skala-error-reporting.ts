type SkalaErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type SkalaEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: SkalaErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    // Platform-injected global — do not rename.
    __lovableEvents?: SkalaEvents;
  }
}

export function reportSkalaError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
