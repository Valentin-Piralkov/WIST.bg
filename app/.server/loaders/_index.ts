import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getLocale } from "../getLocale";
import { EmptyHelloMessage, HelloMessage } from "~/types/HelloMessage";

export async function l({ request }: LoaderFunctionArgs) {
  const locale = await getLocale(request);

  const helloMessage: HelloMessage = EmptyHelloMessage;

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  if (searchParams.has("message")) {
    helloMessage.message = searchParams.get("message") as string;
  }

  return json({
    locale,
    appURL: process.env.APP_URL,
    helloMessage
  });
}
