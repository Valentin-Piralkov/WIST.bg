import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getLocale } from "../getLocale";
import { db } from "~/lib/db";

export async function l({ request, params }: LoaderFunctionArgs) {
  const locale = await getLocale(request);

  const slug = params["slug"];

  const internship = await db.internship.findUnique({
    where: {
      slug: slug
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
