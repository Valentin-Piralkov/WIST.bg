import { useTranslation } from "react-i18next";
import JobOfferSuggestedCard from "../jobs/jobOfferSuggetedCard";

export default function SelectedOffers() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col px-8 py-6 min-h-56 justify-normal items-start bg-white rounded-md border border-gray-light font-title font-medium">
      <h3>{t("suggested_jobs")}</h3>
      <hr className="w-full my-5 border-gray-light border rounded-md" />
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-full">
          <JobOfferSuggestedCard />
          {i !== 3 ? <hr className="w-full my-5 border-gray-light border rounded-md" /> : null}
        </div>
      ))}
    </div>
  );
}
