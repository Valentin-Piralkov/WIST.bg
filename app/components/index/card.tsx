import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { dateToShortString } from "~/lib/utils/stringUtils";
import { Internship } from "~/types/JobTypes";

interface Props {
  companyName: string;
  internship: Internship;
}

export default function IndexCard({ companyName, internship }: Props) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col px-8 py-4 w-full h-[25vh] rounded-md border border-gray-light">
      <div className="flex flex-row h-1/4 w-full justify-between">
        <p className="font-normal">{internship.title}</p>
        <FontAwesomeIcon icon={faBookmark} className="h-full" />
      </div>
      <div className="flex flex-row h-3/4 w-full justify-between gap-8 font-normal">
        <div className="flex flex-col w-40 h-40 justify-center items-center">
          <img src="./uploads/Wist-full.svg" alt="WIST logo" />
        </div>
        <div className="flex flex-col bg-white h-40 w-1/3 justify-end gap-11">
          <p className="text-orange">{companyName}</p>
          <p>{t("deadline") + ": " + dateToShortString(internship.deadline)}</p>
          <p>{t("City") + ": " + internship.location}</p>
        </div>
        <div className="flex flex-col bg-white h-40 w-1/3 justify-end gap-11">
          <p>{internship.salary + " " + t("lv") + t(internship.salaryRate)}</p>
          <p>{internship.hours + " " + t("h") + t(internship.hoursRate)}</p>
        </div>
      </div>
    </div>
  );
}
