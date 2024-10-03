import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getLocale } from "../getLocale";
import { db } from "~/lib/db";

export async function l({ request, params }: LoaderFunctionArgs) {
  const locale = await getLocale(request);

  const slug = params["slug"];

  const sections = await db.section.findMany();

  const user = await db.user.findUnique({
    where: {
      slug: slug
    }
  });

  const savedInternships = user
    ? await db.internship.findMany({
        where: {
          users: {
            some: {
              id: user.id
            }
          }
        },
        include: {
          Company: true
        }
      })
    : [];

  return json({
    locale,
    appURL: process.env.APP_URL,
    sections,
    user,
    savedInternships
  });
}
