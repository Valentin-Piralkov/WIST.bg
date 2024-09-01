import { l } from "~/.server/loaders/_index";
import { useActionData, useLoaderData } from "@remix-run/react";
import { contactFormAction } from "~/.server/actions/index/contactForm";
import IndexHeader from "~/components/header";
import IndexFooter from "~/components/footer";
import IndexFilters from "~/components/index/side-menu/filters";
import IndexCard from "~/components/index/card";

export const loader = l;
export const action = contactFormAction;

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex flex-col justify-between min-h-[100vh] h-full w-full bg-white gap-20">
      <IndexHeader />
      <div className="flex flex-row self-center gap-20 w-10/12 ">
        <div className="flex flex-col w-1/4 justify-start">
          <IndexFilters filters={data.filters} />
        </div>
        <div className="flex flex-col w-3/4 justify-start gap-8">
          {data.companies.map((company) =>
            company.internships.map((internship) => (
              <IndexCard key={internship.id} companyName={company.name} internship={internship} />
            ))
          )}
        </div>
      </div>
      <IndexFooter actionData={actionData} />
    </div>
  );
}
