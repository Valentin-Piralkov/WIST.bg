import { LoaderFunctionArgs } from "@remix-run/node";
import { DEFAULT_LOCALE, LOCALE } from "~/i18n";
import i18next from "~/i18next.server";

export async function getLocale(request: LoaderFunctionArgs["request"]) {
  let locale: string;
  try {
    locale = await i18next.getLocale(request);
  } catch {
    console.error(`index page: can't get locale from request, defaulting to ${DEFAULT_LOCALE}`);
    locale = DEFAULT_LOCALE;
  }

  return locale as LOCALE;
}
