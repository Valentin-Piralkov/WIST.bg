import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDays, faLocationDot, faClock, faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useSearchParams } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { dateToShortString } from "~/lib/utils/stringUtils";
import { Internship } from "~/types/JobTypes";

interface Props {
  companyName: string;
  internship: Internship;
}

export default function IndexCard({ companyName, internship }: Props) {
  const { t } = useTranslation();

  // Get the search params in the URL for navigation:
  const [searchParams] = useSearchParams();

  return (
    <div className="flex flex-col px-8 py-6 w-full h-64 justify-between rounded-md border border-gray-light font-title font-medium text-xl">
      <div className="flex flex-row h-1/4 w-full justify-between">
        <Link to={`/job_offer/${internship.slug}?${searchParams.toString()}`}>
          <h3>{internship.title}</h3>
        </Link>
        <FontAwesomeIcon icon={faBookmark} className="h-full" />
      </div>
      <div className="flex flex-row h-3/4 w-full justify-between">
        <div className="flex flex-col w-40 h-40 justify-center items-center">
          <img src="/uploads/Wist-full.svg" alt="WIST logo" />
        </div>
        <div className="flex flex-col w-2/3 h-full justify-between">
          <span className="text-orange-wist">{companyName}</span>
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
