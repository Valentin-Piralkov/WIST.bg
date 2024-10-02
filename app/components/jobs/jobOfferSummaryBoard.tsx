import {
  faCalendarDays,
  faCircleDollarToSlot,
  faClock,
  faLocationDot,
  faFileContract,
  faBuilding
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useSearchParams } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { dateToShortString } from "~/lib/utils/stringUtils";
import { Internship } from "~/types/JobTypes";

interface Props {
  companyName: string;
  companySlug: string;
  internship: Internship;
}

export default function JobOfferSummaryBoard({ companyName, companySlug, internship }: Props) {
  const { t } = useTranslation();

  // Get the search params in the URL for navigation:
  const [searchParams] = useSearchParams();

  return (
    <div className="flex flex-col py-8 w-full h-72 justify-center items-center bg-blue-dark font-title font-medium text-xl">
      <div className="flex flex-row w-10/12 justify-between gap-10">
        <div className="flex flex-col px-8 py-6 w-2/3 h-56 justify-between bg-white rounded-md border border-gray-light font-title font-medium text-xl">
          <div className="flex flex-row h-2/4 w-full justify-between">
            <a href={`/job_offer/${internship.slug}`}>
              <h3>{internship.title}</h3>
            </a>
          </div>
          <div className="flex flex-row w-full h-2/4 justify-between">
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
            <div className="flex flex-col h-full w-full justify-between">
              <div className="flex flex-row items-center gap-2 w-full">
                <FontAwesomeIcon icon={faFileContract} className="h-full" />
                <p>{internship.duration === 0 ? t("long_term") : internship.duration + " " + t("months")}</p>
              </div>
              <div className="flex flex-row items-center gap-2 w-full">
                <FontAwesomeIcon icon={faBuilding} className="h-full" />
                <p>{t(internship.type)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row px-8 py-6 w-1/3 h-56 justify-between items-center bg-white rounded-md border border-gray-light font-title font-medium text-xl">
          <div className="flex flex-col w-40 h-40 justify-center items-center bg-gray-light"></div>
          <div className="flex flex-col py-2 pl-6 w-2/3 h-full justify-between">
            <span className="font-title font-bold hover:underline">{companyName}</span>
            <span className="font-title">Индустрия</span>
            <Link
              to={`/about/${companySlug}?${searchParams.toString()}`}
              className="font-title text-orange hover:underline"
            >
              {" "}
              Линк към компанията{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
