import { useSearchParams } from "@remix-run/react";
import { useMemo } from "react";

export function useSearchFromSearchParams() {
  const [searchParams] = useSearchParams();

  const search = useMemo(() => {
    if (searchParams.has("search")) return searchParams.get("search") as string;

    return undefined;
  }, [searchParams]);

  return search;
}
