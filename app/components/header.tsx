import { useTranslation } from "react-i18next";
import IndexSearchBar from "./searchBar";
import { Link, useNavigate, useSearchParams } from "@remix-run/react";

export default function IndexHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Get the search params in the URL for navigation:
  const [searchParams] = useSearchParams();

  const handleRegistrationClick = () => {
    navigate(`/register?${searchParams.toString()}`);
  };

  return (
    <div className="flex flex-row items-center justify-center w-full h-24 shadow-md">
      <div className="flex flex-row items-center justify-between w-10/12 h-full">
        <img src="/uploads/Wist.bg.svg" alt="WIST.bg" className="h-[7vh]" />
        <Link to={`/?${searchParams.toString()}`} className="font-title font-normal text-xl underline">
          {t("home")}
        </Link>
        <Link
          to={`/profile/nikolay-nikolov-1/personal_info?${searchParams.toString()}`}
          className="font-title font-normal text-xl"
        >
          {t("profile")}
        </Link>
        <Link to={`/about?${searchParams.toString()}`} className="font-title font-normal text-xl">
          {t("about")}
        </Link>
        <IndexSearchBar />
        <Link to={`/login?${searchParams.toString()}`} className="font-title font-normal text-xl hover:underline">
          {t("login")}
        </Link>
        <button
          className="bg-blue-light text-white px-4 py-2 rounded-md min-w-[12vh] font-title font-normal text-xl hover:underline"
          onClick={handleRegistrationClick}
        >
          {t("register")}
        </button>
      </div>
    </div>
  );
}
