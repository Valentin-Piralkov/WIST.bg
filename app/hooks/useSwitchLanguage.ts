import { useSearchParams } from "@remix-run/react";

export function useSwitchLanguage() {
  const [searchParams, setSearchParams] = useSearchParams();

  function switchLanguage(lang: "en" | "bg") {
    const currentLang = searchParams.get("lang");
    if (currentLang === lang) return;

    const newParams = new URLSearchParams();
    newParams.set("lang", lang);
    setSearchParams(newParams, { preventScrollReset: true });
  }

  return switchLanguage;
}
