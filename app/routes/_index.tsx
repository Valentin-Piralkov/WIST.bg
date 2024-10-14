import { l } from "~/.server/loaders/_index";
import IndexHeader from "~/components/header";
import IndexFooter from "~/components/footer";
import IndexFilters from "~/components/index/side-menu/filters";
import IndexCard from "~/components/index/indexJobCard";
import { redirect, useLoaderData } from "@remix-run/react";

export const loader = l;

export default function Index() {
  const data = useLoaderData<typeof loader>();

  if (data && "userType" in data && data.userType === "employer") {
    return redirect("/employer/dashboard");
  }

  const allInternships = data.companies.flatMap((company) =>
    company.internships.map((internship) => ({
      ...internship,
      companyName: company.name
    }))
  );

  let renderInternships = [];
  let isUserloggedIn = false;
  if (data && "userId" in data && "userType" in data && data.userType === "user") {
    renderInternships = allInternships;
    isUserloggedIn = true;
  } else {
    renderInternships = allInternships.slice(0, 3);
  }

  return (
    <div className="flex flex-col justify-between min-h-[100vh] h-full w-full bg-white gap-20">
      <IndexHeader isUserLoggedIn={isUserloggedIn} profile_slug={data.profile_slug || ""} />
      <div className="flex flex-row self-center gap-20 w-10/12 ">
        <div className="flex flex-col w-1/4 justify-start">
          <IndexFilters filters={data.filters} />
        </div>
        <div className="flex flex-col w-3/4 justify-start gap-8">
          {renderInternships.map((internship) => (
            <IndexCard key={internship.id} companyName={internship.companyName} internship={internship} />
          ))}
        </div>
      </div>
      <IndexFooter />
    </div>
  );
}
