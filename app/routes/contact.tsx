import { redirect } from "@remix-run/node";
import { contactFormAction } from "~/.server/actions/index/contactForm";

export const action = contactFormAction;

export const loader = () => redirect("/");

export default function RegisterUser() {
  return <></>;
}
