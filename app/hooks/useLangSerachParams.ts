import { useSearchParams } from "@remix-run/react";
import { useMemo } from "react";

export function useLangSearchParams() {
  const [searchParams] = useSearchParams();

  const searchParamsWithLocale = useMemo(() => {
    const newSearchParams = new URLSearchParams();
    if (searchParams.has("lang")) newSearchParams.set("lang", searchParams.get("lang") || "");

    return newSearchParams;
  }, [searchParams]);

  return searchParamsWithLocale;
}
