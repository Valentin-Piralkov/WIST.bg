import { useActionData } from "@remix-run/react";
import { contactFormAction } from "~/.server/actions/index/contactForm";
import IndexHeader from "~/components/header";
import IndexFooter from "~/components/footer";
import RegisterCard from "~/components/registration/registerCard";

export const action = contactFormAction;

export default function Register() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex flex-col justify-between items-center min-h-[100vh] h-full w-full bg-white gap-20">
      <IndexHeader />
      <RegisterCard />
      <IndexFooter actionData={actionData} />
    </div>
  );
}
