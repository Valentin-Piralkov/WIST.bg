import { useTranslation } from "react-i18next";
import JobOfferSuggestedCard from "./jobOfferSuggetedCard";

export default function JobOfferSuggested() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col my-8 px-8 py-6 w-1/3 min-h-56 justify-normal items-start bg-white rounded-md border border-gray-light font-title font-medium">
      <h3>{t("similar_jobs")}</h3>
      <hr className="w-full my-5 border-gray-light border rounded-md" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-full">
          <JobOfferSuggestedCard />
          {i !== 4 ? <hr className="w-full my-5 border-gray-light border rounded-md" /> : null}
        </div>
      ))}
    </div>
  );
}
