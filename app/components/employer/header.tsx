import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "@remix-run/react";

export default function EmployerHeader() {
  const { t } = useTranslation();

  // Get the search params in the URL for navigation:
  const [searchParams] = useSearchParams();

  return (
    <div className="flex flex-row items-center justify-center w-full h-24 shadow-md">
      <div className="flex flex-row items-center justify-between w-10/12 h-full">
        <div className="flex flex-row items-center justify-between h-full gap-10">
          <img src="/uploads/Wist.bg.svg" alt="WIST.bg" className="h-[7vh]" />
          <Link
            to={`/employer/profile/boxnow-1/company_info?${searchParams.toString()}`}
            className="font-title font-normal text-xl"
          >
            {t("profile")}
          </Link>
          <Link
            to={`/employer/dashboard/boxnow-1?${searchParams.toString()}`}
            className="font-title font-normal text-xl"
          >
            {t("dashboard")}
          </Link>
        </div>

        <Link
          to={`/employer/profile/boxnow-1?${searchParams.toString()}`}
          className="font-title font-normal text-xl hover:underline"
        >
          {t("logout")}
        </Link>
      </div>
    </div>
  );
}
