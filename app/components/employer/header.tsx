import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "@remix-run/react";
import Logout from "../login/logout";

interface Props {
  isUserLoggedIn: boolean;
  profile_slug: string;
}

export default function EmployerHeader({ isUserLoggedIn, profile_slug }: Props) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  // Get the search params in the URL for navigation:
  const [searchParams] = useSearchParams();

  const handleRegistrationClick = () => {
    navigate(`/employer/register?${searchParams.toString()}`);
  };

  return (
    <div className="flex flex-row items-center justify-center w-full h-24 shadow-md">
      <div className="flex flex-row items-center justify-between w-10/12 h-full">
        {isUserLoggedIn ? (
          <div className="flex flex-row items-center justify-between h-full gap-10">
            <img src="/uploads/Wist.bg.svg" alt="WIST.bg" className="h-[7vh]" />
            <Link
              to={
                profile_slug !== ""
                  ? `/employer/profile/${profile_slug}/company_info?${searchParams.toString()}`
                  : `/employer/login?${searchParams.toString()}`
              }
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
        ) : (
          <div className="flex flex-row items-center justify-between h-full gap-10">
            <img src="/uploads/Wist.bg.svg" alt="WIST.bg" className="h-[7vh]" />
            <Link to={`/employer/?${searchParams.toString()}`} className="font-title font-normal text-xl underline">
              {t("home")}
            </Link>
            <Link to={`/about?${searchParams.toString()}`} className="font-title font-normal text-xl">
              {t("about")}
            </Link>
          </div>
        )}

        {isUserLoggedIn ? (
          <Logout />
        ) : (
          <div className="flex flex-row justify-between items-center gap-16">
            <Link
              to={`/employer/login?${searchParams.toString()}`}
              className="font-title font-normal text-xl hover:underline"
            >
              {t("login")}
            </Link>
            <button
              className="bg-blue-light text-white px-4 py-2 rounded-md min-w-[12vh] font-title font-normal text-xl hover:underline"
              onClick={handleRegistrationClick}
            >
              {t("register")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
