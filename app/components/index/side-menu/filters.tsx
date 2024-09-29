import { Filter } from "~/types/FilterTypes";
import IndexFilter from "./filter";
import { useTranslation } from "react-i18next";

interface Props<T extends string> {
  filters: Filter<T>[];
}

export default function IndexFilters({ filters }: Props<string>) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-normal text-left gap-4 mb-4">
      <button className="text-xl font-title text-left text-orange">{t("clear_filters")}</button>
      <hr className="border-1 border-gray-light" />
      {filters.map((filter, index) => (
        <div key={index} className="flex flex-col gap-4">
          <IndexFilter label={filter.label} options={filter.options} />
          <hr className="border-1 border-gray-light" />
        </div>
      ))}
    </div>
  );
}
