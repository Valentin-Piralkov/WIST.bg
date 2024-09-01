import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

export default function IndexCard() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col px-8 py-4 w-full h-[25vh] rounded-md border border-gray-light">
      <div className="flex flex-row h-1/4 w-full justify-between">
        <p>Стаж за програмист (шест месеца)</p>
        <FontAwesomeIcon icon={faBookmark} className="h-full" />
      </div>
      <div className="flex flex-row h-3/4 w-full justify-between gap-8">
        <div className="flex flex-col w-40 h-40 justify-center items-center">
          <img src="./uploads/Wist-full.svg" alt="WIST logo" />
        </div>
        <div className="flex flex-col bg-white h-40 w-1/3 justify-end gap-11">
          <p>{t("company_name")}</p>
          <p>{t("deadline") + "28.07.2024"}</p>
          <p>София</p>
        </div>
        <div className="flex flex-col bg-white h-40 w-1/3 justify-end gap-11">
          <p>{t("salary")}</p>
          <p>{t("work_hours")}</p>
        </div>
      </div>
    </div>
  );
}
