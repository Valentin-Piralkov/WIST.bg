import { l } from "~/.server/loaders/_index";
import { useActionData, useLoaderData } from "@remix-run/react";
import { contactFormAction } from "~/.server/actions/index/contactForm";
import IndexHeader from "~/components/index/header";
import IndexFooter from "~/components/index/footer";
import IndexFilters from "~/components/index/side-menu/filters";

export const loader = l;
export const action = contactFormAction;

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  console.log(data);

  return (
    <div className="flex flex-col justify-between min-h-[100vh] h-full w-full bg-white gap-8">
      <IndexHeader />
      <div className="flex flex-row self-center gap-8 w-10/12 ">
        <div className="flex flex-col w-1/4 justify-start">
          <IndexFilters filters={data.filters} />
        </div>
      </div>
      <IndexFooter actionData={actionData} />
    </div>
  );
}
