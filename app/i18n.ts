export type LOCALE = "bg" | "en";
export const SUPPORTED_LOCALES: LOCALE[] = ["bg", "en"];
export const DEFAULT_LOCALE: LOCALE = "bg";

export default {
  supportedLngs: SUPPORTED_LOCALES,
  fallbackLng: DEFAULT_LOCALE,
  defaultNS: "common",
  react: { useSuspense: false }
};
