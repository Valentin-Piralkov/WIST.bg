import { useSearchParams } from "@remix-run/react";
import { useCallback, useMemo } from "react";

export default function usePagination(totalItems: number, perPageDefault: number) {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = useMemo(() => {
    if (!searchParams.has("perPage")) return perPageDefault;

    const parsed = parseInt(searchParams.get("perPage") || "");
    if (isNaN(parsed)) return perPageDefault;

    return parsed;
  }, [searchParams, perPageDefault]);

  const totalPages = useMemo(() => Math.ceil(totalItems / perPage), [totalItems, perPage]);

  const changePage = useCallback(
    (newPage: number) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", newPage + "");
      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams]
  );

  const currentPage = useMemo(
    () => (searchParams.has("page") ? parseInt(searchParams.get("page") as string) : 1),
    [searchParams]
  );

  return { currentPage, changePage, totalPages, perPage };
}
