import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/minimal.css";
import usePagination from "~/hooks/usePagination";
import { ClientOnly } from "remix-utils/client-only";

interface Props {
  totalItems: number;
  defaultPerPage: number;
}

export default function Pagination(props: Props) {
  const { currentPage, changePage, totalPages } = usePagination(props.totalItems, props.defaultPerPage);

  if (totalPages === 1) return <></>;

  return (
    <ClientOnly fallback={null}>
      {() => (
        <div className="lg:mt-8">
          <ResponsivePagination current={currentPage} total={totalPages} onPageChange={changePage} />
        </div>
      )}
    </ClientOnly>
  );
}
