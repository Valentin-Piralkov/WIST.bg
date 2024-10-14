import { Outlet, useLoaderData } from "@remix-run/react";
import { l } from "~/.server/loaders/employer/profile";
import { useTranslation } from "react-i18next";
import EmployerFooter from "~/components/employer/footer";
import EmployerProfileSections from "~/components/employer/sections";
import EmployerHeader from "~/components/employer/header";

export const loader = l;

export default function EmployerProfile() {
  const { t } = useTranslation();
  const data = useLoaderData<typeof loader>();

  if (!data.company) {
    return <div> {t("companmy_not_found")} </div>;
  }

  const isUserLoggedIn = data.userId ? true : false;

  return (
    <div className="flex flex-col justify-between min-h-[100vh] h-full w-full bg-white gap-20">
      <div className="flex flex-col gap-10">
        <EmployerHeader isUserLoggedIn={isUserLoggedIn} profile_slug={data.company.slug} />
        <div className="flex flex-row w-full h-full px-40 gap-20">
          <div className="flex flex-col w-1/4 mt-8 justify-start">
            <EmployerProfileSections sections={data.sections} slug={data.company.slug} />
          </div>
          <div className="flex flex-col w-3/4 justify-start">
            <Outlet />
          </div>
        </div>
      </div>
      <EmployerFooter />
    </div>
  );
}
