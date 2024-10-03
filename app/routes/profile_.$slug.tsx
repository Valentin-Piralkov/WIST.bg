import { Outlet, useLoaderData } from "@remix-run/react";
import IndexHeader from "~/components/header";
import IndexFooter from "~/components/footer";
import { l } from "~/.server/loaders/profile";
import ProfileSections from "~/components/profile/sctions";
import { useTranslation } from "react-i18next";

export const loader = l;

export default function Index() {
  const { t } = useTranslation();
  const data = useLoaderData<typeof loader>();

  if (!data.user) {
    return <div> {t("user_not_found")} </div>;
  }

  return (
    <div className="flex flex-col justify-between min-h-[100vh] h-full w-full bg-white gap-20">
      <IndexHeader />
      <div className="flex flex-row w-full px-40 self-center gap-20">
        <div className="flex flex-col w-1/4 mt-8 justify-start">
          <ProfileSections sections={data.sections} slug={data.user.slug} />
        </div>
        <div className="flex flex-col w-3/4 justify-start">
          <Outlet />
        </div>
      </div>
      <IndexFooter />
    </div>
  );
}
