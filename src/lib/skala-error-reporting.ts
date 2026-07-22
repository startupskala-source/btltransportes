export function reportSkalaError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  console.error("[SkalaError]", error, context);
}
