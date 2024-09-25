import { l } from "~/.server/loaders/job_offer";
import IndexHeader from "~/components/header";
import IndexFooter from "~/components/footer";
import { useLoaderData } from "@remix-run/react";

export const loader = l;

export default function JobOffer() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <div className="flex flex-col justify-between items-center min-h-[100vh] h-full w-full bg-white gap-20">
      <IndexHeader />
      Main Content
      <IndexFooter />
    </div>
  );
}
