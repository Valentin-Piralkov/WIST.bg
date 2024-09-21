import { useTranslation } from "react-i18next";

export default function RegisterCard() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col px-8 py-6 w-1/3 h-[40vh] justify-between items-center font-title font-medium text-xl">
      <div className="flex flex-col w-full h-[10vh] justify-center items-center">
        <h2>{t("create_profile")}</h2>
        <div className="flex flex-row w-full justify-center items-center gap-4 mt-4">
          <h5>{t("create_profile_text")}</h5>{" "}
          <a href="/login" className="text-orange hover:underline">
            {" "}
            <h5> {t("login_text")} </h5>
          </a>
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center gap-4">
        <a href="/register_user" className="w-full">
          <button className="w-full h-[5vh] bg-blue-light text-white px-4 py-2 rounded-md font-title font-normal text-xl hover:underline">
            {t("looking_for_work")}
          </button>
        </a>
        <a href="/" className="w-full">
          <button className="w-full h-[5vh] bg-orange text-white px-4 py-2 rounded-md min-w-[12vh] font-title font-normal text-xl hover:underline">
            {t("offering_work")}
          </button>
        </a>
      </div>
    </div>
  );
}
