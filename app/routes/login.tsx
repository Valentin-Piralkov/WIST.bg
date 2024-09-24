import { useActionData } from "@remix-run/react";
import { contactFormAction } from "~/.server/actions/index/contactForm";
import IndexHeader from "~/components/header";
import IndexFooter from "~/components/footer";
import UserLoginCard from "~/components/login/loginCard";

export const action = contactFormAction;

export default function RegisterUser() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex flex-col justify-between items-center min-h-[100vh] h-full w-full bg-white gap-20">
      <IndexHeader />
      <UserLoginCard />
      <IndexFooter actionData={actionData} />
    </div>
  );
}
