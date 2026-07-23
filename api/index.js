// Serverless entry point for Vercel — TanStack Start SSR handler
// This bridges Vite's SSR output with Vercel's runtime

export default async function handler(request, response) {
  try {
    // Dynamic import of the pre-built SSR server handler
    const serverModule = await import("../dist/server/server.js");
    const serverHandler = serverModule.default || serverModule;

    // Convert Node.js IncomingMessage + ServerResponse to Fetch API
    const url = new URL(request.url, `https://${request.headers.host || "localhost"}`);

    const headers = new Headers();
    for (const [key, value] of Object.entries(request.headers)) {
      if (value !== undefined) {
        headers.set(key, Array.isArray(value) ? value.join(", ") : value);
      }
    }

    const body =
      request.method !== "GET" && request.method !== "HEAD"
        ? await new Promise((resolve) => {
            const chunks = [];
            request.on("data", (chunk) => chunks.push(chunk));
            request.on("end", () => resolve(Buffer.concat(chunks)));
          })
        : undefined;

    const fetchRequest = new Request(url, {
      method: request.method,
      headers,
      body,
    });

    const serverResponse = await serverHandler.fetch(fetchRequest, {}, {});

    // Convert Fetch Response back to Node.js ServerResponse
    response.statusCode = serverResponse.status;

    serverResponse.headers.forEach((value, key) => {
      response.setHeader(key, value);
    });

    const responseBody = await serverResponse.text();
    response.end(responseBody);
  } catch (error) {
    console.error("SSR handler error:", error);
    response.statusCode = 500;
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end(renderErrorPage());
  }
}

function renderErrorPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
