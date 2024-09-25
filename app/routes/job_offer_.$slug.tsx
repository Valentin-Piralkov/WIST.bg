import { l } from "~/.server/loaders/job_offer";
import IndexHeader from "~/components/header";
import IndexFooter from "~/components/footer";
import { useLoaderData } from "@remix-run/react";
import JobOfferSummaryBoard from "~/components/jobs/jobOfferSummaryBoard";
import JobOfferMain from "~/components/jobs/jobOfferMain";
import JobOfferSuggested from "~/components/jobs/jobOfferSuggested";

export const loader = l;

export default function JobOffer() {
  const data = useLoaderData<typeof loader>();

  if (!data.internship) {
    return <div>Internship not found</div>;
  }

  return (
    <div className="flex flex-col justify-between items-center min-h-[100vh] h-full w-full bg-white">
      <div className="flex flex-col w-full items-center">
        <IndexHeader />
        <JobOfferSummaryBoard companyName={data.internship.Company.name} internship={data.internship} />
      </div>
      <div className="flex flex-row w-10/12 min-h-[60vh] justify-between items-start gap-10">
        <JobOfferMain internship={data.internship} />
        <JobOfferSuggested />
      </div>
      <IndexFooter />
    </div>
  );
}
