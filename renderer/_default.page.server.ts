import { renderToNodeStream } from "@vue/server-renderer";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";
import { createApp } from "./app";
import type { PageContextServer } from "./types";

export { render };
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = [
  "pageProps",
  "browserLocale",
  "host",
];

async function onBeforeRender(pageContext: PageContextServer) {
  const { app, router, i18n } = createApp(pageContext);

  router.push(pageContext.urlPathname);
  await router.isReady();

  const stream = renderToNodeStream(app);
  return {
    pageContext: {
      stream,
    },
  };
}

export { onBeforeRender };

async function render(pageContext: PageContextServer) {
  const { stream } = pageContext;

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body>
        <div id="app">${stream}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {},
  };
}
