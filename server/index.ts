import express from "express";
import compression from "compression";
import { renderPage } from "vite-plugin-ssr";
import { root } from "./root.js";
import type { PageContextServer } from "../renderer/types";
const isProduction = process.env.NODE_ENV === "production";

startServer();

async function startServer() {
  const app = express();

  app.use(compression());

  if (isProduction) {
    const sirv = (await import("sirv")).default;
    app.use(sirv(`${root}/dist/client`));
  } else {
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  app.get("*", async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      host: req.headers.host,
      userAgent: req.get("User-Agent"),
    };
    const pageContext: PageContextServer = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) return next();
    res.type(httpResponse.contentType);
    res.status(httpResponse.statusCode);
    httpResponse.pipe(res);
  });

  const port = process.env.PORT || 8082;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
