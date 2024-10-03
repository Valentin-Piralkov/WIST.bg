import { useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { l } from "~/.server/loaders/profile";
import IndexCard from "~/components/index/indexJobCard";

export const loader = l;

export default function Saved() {
  const { t } = useTranslation();
  const data = useLoaderData<typeof loader>();

  const internships = data.savedInternships;

  if (!internships) {
    return <div> {t("internships_not_found")} </div>;
  }

  if (internships.length === 0) {
    return <div> {t("no_saved_internships")} </div>;
  }

  return (
    <div>
      {" "}
      <div className="flex flex-col w-full justify-start gap-8">
        {internships.map((internship) => (
          <IndexCard key={internship.id} companyName={internship.Company.name} internship={internship} />
        ))}
      </div>
    </div>
  );
}
