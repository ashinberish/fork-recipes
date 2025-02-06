/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { PassThrough } from "node:stream";

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
// import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { createInstance } from "i18next";
import i18next from "./i18n.server";
import i18n from "./i18n";
import { resolve } from "node:path";
import I18NexFsBackend from "i18next-fs-backend";

const ABORT_DELAY = 5_000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext
) {
  const i18nInstance = createInstance();
  const lng = await i18next.getLocale(request);
  const ns = i18next.getRouteNamespaces(remixContext);
  
  await i18nInstance.use(initReactI18next).use(I18NexFsBackend).init({
    ...i18n,
    lng,
    ns,
    backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") },
  });

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={i18nInstance}>
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />,
      </I18nextProvider>,
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

// function handleBotRequest(
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext
// ) {
  
//   return new Promise((resolve, reject) => {
//     let shellRendered = false;
//     const { pipe, abort } = renderToPipeableStream(
//       <RemixServer
//         context={remixContext}
//         url={request.url}
//         abortDelay={ABORT_DELAY}
//       />,
//       {
//         onAllReady() {
//           shellRendered = true;
//           const body = new PassThrough();
//           const stream = createReadableStreamFromReadable(body);

//           responseHeaders.set("Content-Type", "text/html");

//           resolve(
//             new Response(stream, {
//               headers: responseHeaders,
//               status: responseStatusCode,
//             })
//           );

//           pipe(body);
//         },
//         onShellError(error: unknown) {
//           reject(error);
//         },
//         onError(error: unknown) {
//           responseStatusCode = 500;
//           // Log streaming rendering errors from inside the shell.  Don't log
//           // errors encountered during initial shell rendering since they'll
//           // reject and get logged in handleDocumentRequest.
//           if (shellRendered) {
//             console.error(error);
//           }
//         },
//       }
//     );

//     setTimeout(abort, ABORT_DELAY);
//   });
// }

//  async function handleBrowserRequest(
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext
// ) {
//   const i18nInstance = createInstance();
//   const lng = await i18next.getLocale(request);
//   const ns = i18next.getRouteNamespaces(remixContext);
  
//   await i18nInstance.use(initReactI18next).use(I18NexFsBackend).init({
//     ...i18n,
//     lng,
//     ns,
//     backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") },
//   });

//   return new Promise((resolve, reject) => {
//     let shellRendered = false;
//     const { pipe, abort } = renderToPipeableStream(
//       <I18nextProvider i18n={i18nInstance}>
//         <RemixServer
//           context={remixContext}
//           url={request.url}
//           abortDelay={ABORT_DELAY}
//         />,
//       </I18nextProvider>,
//       {
//         onShellReady() {
//           shellRendered = true;
//           const body = new PassThrough();
//           const stream = createReadableStreamFromReadable(body);

//           responseHeaders.set("Content-Type", "text/html");

//           resolve(
//             new Response(stream, {
//               headers: responseHeaders,
//               status: responseStatusCode,
//             })
//           );

//           pipe(body);
//         },
//         onShellError(error: unknown) {
//           reject(error);
//         },
//         onError(error: unknown) {
//           responseStatusCode = 500;
//           // Log streaming rendering errors from inside the shell.  Don't log
//           // errors encountered during initial shell rendering since they'll
//           // reject and get logged in handleDocumentRequest.
//           if (shellRendered) {
//             console.error(error);
//           }
//         },
//       }
//     );

//     setTimeout(abort, ABORT_DELAY);
//   });
// }
