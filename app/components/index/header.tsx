import { useTranslation } from "react-i18next";
import IndexSearchBar from "./searchBar";

export default function IndexHeader() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row items-center justify-center w-full h-[10vh] shadow-md">
      <div className="flex flex-row items-center justify-between w-10/12 h-full">
        <img src="./uploads/index_logo.svg" alt="WIST.bg" className="h-[200%]" />
        <a href="/" className="font-title font-normal text-xl underline">
          {t("home")}
        </a>
        <a href="/profile" className="font-title font-normal text-xl">
          {t("profile")}
        </a>
        <a href="/about" className="font-title font-normal text-xl">
          {t("about")}
        </a>
        <IndexSearchBar />
        <a href="/login" className="font-title font-normal text-xl hover:underline">
          {t("login")}
        </a>
        <button className="bg-blue-light text-white px-4 py-2 rounded-md min-w-[12vh] font-title font-normal text-xl hover:underline">
          {t("register")}
        </button>
      </div>
    </div>
  );
}
