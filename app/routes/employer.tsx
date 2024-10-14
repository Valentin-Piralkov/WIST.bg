import IndexFooter from "~/components/footer";
import EmployerHeader from "~/components/employer/header";
import { l } from "~/.server/loaders/employer/index";
import { useLoaderData } from "@remix-run/react";

export const loader = l;

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const isUserLoggedIn = data.userId ? true : false;

  return (
    <div className="flex flex-col justify-between min-h-[100vh] h-full w-full bg-white gap-20">
      <EmployerHeader isUserLoggedIn={isUserLoggedIn} profile_slug="" />
      <div className="flex flex-row self-center gap-20 w-10/12 ">contehrheehn</div>
      <IndexFooter />
    </div>
  );
}
