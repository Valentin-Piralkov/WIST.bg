import { ActionFunctionArgs, json } from "@remix-run/node";
import { getLocale } from "~/.server/getLocale";
import { HelloMessage } from "~/types/HelloMessage";

export type ContactFormData =
  | {
      ok: false;
      message: string;
    }
  | {
      ok: true;
      message: HelloMessage;
    };

export async function contactFormAction({ request }: ActionFunctionArgs) {
  const locale = await getLocale(request);

  const body = await request.formData();
  const name = body.get("name");

  if (!name) {
    return json<ContactFormData>({
      ok: false,
      message: locale === "en" ? "Please, input all required fields." : "Моля, въведете всички задължителни полета."
    });
  }

  return json<ContactFormData>({
    ok: true,
    message: locale === "en" ? { message: `Hi, ${name}!` } : { message: `Здравей, ${name}!` }
  });
}
