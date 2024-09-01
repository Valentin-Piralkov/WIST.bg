import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getLocale } from "../getLocale";
import { EmptyHelloMessage, HelloMessage } from "~/types/HelloMessage";
import { db } from "~/lib/db";

export async function l({ request }: LoaderFunctionArgs) {
  const locale = await getLocale(request);

  const helloMessage: HelloMessage = EmptyHelloMessage;

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  if (searchParams.has("message")) {
    helloMessage.message = searchParams.get("message") as string;
  }

  const filters = await db.category.findMany({
    include: {
      options: true
    }
  });

  const users = await db.user.findMany({
    omit: {
      password: true
    }
  });

  const companies = await db.company.findMany({
    omit: {
      password: true
    },
    include: {
      internships: true
    }
  });

  return json({
    locale,
    appURL: process.env.APP_URL,
    helloMessage,
    filters,
    users,
    companies
  });
}
