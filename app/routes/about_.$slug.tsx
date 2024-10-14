import IndexHeader from "~/components/header";
import IndexFooter from "~/components/footer";
import CompanyOfferSuggested from "~/components/about/companyOffers";
import { l } from "~/.server/loaders/about";
import { useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export const loader = l;

export default function JobOffer() {
  const { t } = useTranslation();
  const data = useLoaderData<typeof loader>();

  const isUserLoggedIn = data.userId ? true : false;

  if (!data.company) {
    return <div>{t("company_not_found")}</div>;
  }

  return (
    <div className="flex flex-col justify-between items-center min-h-[100vh] h-full w-full bg-white">
      <IndexHeader isUserLoggedIn={isUserLoggedIn} profile_slug={data.profile_slug || ""} />
      <div className="flex flex-row w-full px-40 py-12 min-h-[60vh] justify-between items-start gap-20">
        <div className="flex flex-col w-2/3 min-h-[60vh] justify-normal items-start gap-5">
          <div className="flex flex-col w-full h-28 items-start gap-5">
            <h1 className="font-title font-medium text-4xl"> {data.company.name} </h1>
            <h3 className="font-title font-normal mb-8 text-2xl text-gray-mid">Услуги за набиране и заетост</h3>
          </div>
          <p>{data.company.description}</p>
        </div>
        <div className="flex flex-col w-1/3 min-h-[60vh] justify-between items-start gap-5">
          <span className="h-28">
            <img src="/uploads/Wist-full.svg" alt="WIST logo" />
          </span>
          <CompanyOfferSuggested />
        </div>
      </div>

      <IndexFooter />
    </div>
  );
}
