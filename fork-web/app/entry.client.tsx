/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import i18next, {use} from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "./i18n";
import I18NexFsBackend from "i18next-fs-backend";

async function hydrate() {
  await use(initReactI18next)
      .use(LanguageDetector)
      .use(I18NexFsBackend)
      .init({
        ...i18n,
        ns: 'translation',
        backend: { loadPath: "public/locales/{{lng}}/{{ns}}.json" },
        detection: {
          order: ["htmlTag"],
          fallbackLng: "fr"
        },
      });
}

startTransition(() => {
  hydrateRoot(
    document,
    <I18nextProvider i18n={i18next}>
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    </I18nextProvider>
  );
});

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
