import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export default function IndexSearchBar() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row items-center border-2 border-orange rounded-md">
      <input
        type="text"
        className="pl-2 pr-4 border-r-2 border-orange py-2 ml-2 font-title font-normal focus:outline-none"
        placeholder={t("keyword")}
      />
      <input type="text" className="px-4 py-2 font-title font-normal focus:outline-none" placeholder={t("location")} />
      <button className="bg-orange text-white px-4 py-2">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}
