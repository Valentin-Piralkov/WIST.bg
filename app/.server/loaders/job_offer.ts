import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getLocale } from "../getLocale";
import { db } from "~/lib/db";

export async function l({ request }: LoaderFunctionArgs) {
  const locale = await getLocale(request);

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const jobOfferId = searchParams.get("id");

  if (!jobOfferId) {
    return redirect("/500");
  }

  const internship = await db.internship.findUnique({
    where: {
      id: jobOfferId
    },
    include: {
      Company: true
    }
  });

  return json({
    locale,
    appURL: process.env.APP_URL,
    internship
  });
}
