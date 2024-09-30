import { l } from "~/.server/loaders/job_offer";
import IndexHeader from "~/components/header";
import IndexFooter from "~/components/footer";
import { useLoaderData } from "@remix-run/react";
import JobOfferSummaryBoard from "~/components/jobs/jobOfferSummaryBoard";
import JobOfferSuggested from "~/components/jobs/jobOfferSuggested";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ApplyForm from "~/components/jobs/applyForm";

export const loader = l;

export default function JobOffer() {
  const { t } = useTranslation();
  const data = useLoaderData<typeof loader>();
  // State to control the light-blue section visibility
  const [isSectionOpen, setSectionOpen] = useState(false);

  if (!data.internship) {
    return <div>Internship not found</div>;
  }

  return (
    <div className="flex flex-col justify-between items-center min-h-[100vh] h-full w-full bg-white">
      <IndexHeader />
      <div className="flex flex-col w-full items-center">
        <JobOfferSummaryBoard companyName={data.internship.Company.name} internship={data.internship} />
      </div>
      <div className="relative flex flex-row w-full px-40 min-h-[60vh] justify-between items-start gap-10">
        <div
          className={`absolute -top-72 right-0 bottom-0 transition-all duration-300 overflow-hidden bg-blue-light ${
            isSectionOpen ? "w-[calc(33.333%+44px)]" : "w-0"
          }`}
        >
          <div className="px-12 py-8">
            <button className="hover:cursor-pointer" onClick={() => setSectionOpen(false)}>
              <FontAwesomeIcon icon={faX} className="h-full" size="lg" />
            </button>
            <ApplyForm />
          </div>
        </div>
        <div className="flex flex-col py-8 w-2/3 justify-center items-start font-title font-medium text-xl">
          <div className="flex flex-row w-full h-full justify-between items-center">
            <div className="flex flex-row justify-between items-center gap-4">
              <button className="bg-blue-light text-white h-full font-title font-medium text-xl px-4 py-2 rounded-md">
                {t("apply")}
              </button>
              <button
                className="bg-orange text-white font-title font-medium text-xl px-4 py-2 rounded-md"
                onClick={() => setSectionOpen(true)} // Toggle light-blue section
              >
                {t("apply_with_wist")}
              </button>
            </div>
            <button className="bg-white font-title font-medium text-xl px-4 py-2 rounded-md border border-gray-light">
              {t("save")}
              <FontAwesomeIcon icon={faBookmark} className="h-full ml-4" />
            </button>
          </div>
          <hr className="w-full my-8 border-gray-light border rounded-md" />
          <div className="flex flex-row w-full justify-normal items-center gap-4">
            <button className="bg-white font-body font-medium text-xl px-4 py-2 rounded-md border border-gray-light">
              Java
            </button>
            <button className="bg-white font-body font-medium text-xl px-4 py-2 rounded-md border border-gray-light">
              Adobe Photoshop
            </button>
            <button className="bg-white font-body font-medium text-xl px-4 py-2 rounded-md border border-gray-light">
              SCRUM
            </button>
            <button className="bg-white font-body font-medium text-xl px-4 py-2 rounded-md border border-gray-light">
              English
            </button>
            <button className="bg-white font-body font-medium text-xl px-4 py-2 rounded-md border border-gray-light">
              Customer Service
            </button>
          </div>
          <hr className="w-full my-8 border-gray-light border rounded-md" />
          <div dangerouslySetInnerHTML={{ __html: data.internship.description }} />
          <div className="flex flex-row my-8 justify-between items-center gap-4">
            <button className="bg-blue-light text-white font-title font-medium text-xl px-4 py-2 rounded-md">
              {t("apply")}
            </button>
            <button
              className="bg-orange text-white font-title font-medium text-xl px-4 py-2 rounded-md"
              onClick={() => setSectionOpen(true)} // Toggle light-blue section
            >
              {t("apply_with_wist")}
            </button>
          </div>
        </div>
        <JobOfferSuggested />
      </div>
      <IndexFooter />
    </div>
  );
}
