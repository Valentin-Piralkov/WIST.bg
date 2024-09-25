import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDays, faLocationDot, faClock, faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
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
    <div className="flex flex-col px-8 py-6 w-full h-[25vh] rounded-md border border-gray-light font-title font-medium text-xl">
      <div className="flex flex-row h-1/4 w-full justify-between">
        <a href={`/job_offer?id=${internship.id}`}>
          <p>{internship.title}</p>
        </a>
        <FontAwesomeIcon icon={faBookmark} className="h-full" />
      </div>
      <div className="flex flex-row h-3/4 w-full justify-start gap-16">
        <div className="flex flex-col w-40 h-40 justify-center items-center">
          <img src="./uploads/Wist-full.svg" alt="WIST logo" />
        </div>
        <div className="flex flex-col w-2/3 h-full justify-between">
          <span className="text-orange">{companyName}</span>
          <div className="flex flex-row w-full h-2/3 justify-between">
            <div className="flex flex-col h-full w-full justify-between">
              <div className="flex flex-row items-center gap-2 w-full">
                <FontAwesomeIcon icon={faCalendarDays} className="h-full" />
                <p>{dateToShortString(internship.deadline)}</p>
              </div>
              <div className="flex flex-row items-center gap-2 w-full">
                <FontAwesomeIcon icon={faLocationDot} className="h-full" />
                <p>{internship.location}</p>
              </div>
            </div>
            <div className="flex flex-col h-full w-full justify-between">
              <div className="flex flex-row items-center gap-2 w-full">
                <FontAwesomeIcon icon={faCircleDollarToSlot} className="h-full" />
                <p>{internship.salary + " " + t("lv") + t(internship.salaryRate)}</p>
              </div>
              <div className="flex flex-row items-center gap-2 w-full">
                <FontAwesomeIcon icon={faClock} className="h-full" />
                <p>{internship.hours + " " + t("h") + t(internship.hoursRate)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
