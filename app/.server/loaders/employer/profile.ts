import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getLocale } from "../../getLocale";
import { db } from "~/lib/db";

export async function l({ request, params }: LoaderFunctionArgs) {
  const locale = await getLocale(request);

  const slug = params["slug"];

  const sections = await db.employerSection.findMany();

  const company = await db.company.findUnique({
    where: {
      slug: slug
    },
    include: {
      internships: true
    }
  });

  const all_skills = await db.skill.findMany();

  return json({
    locale,
    appURL: process.env.APP_URL,
    sections,
    company,
    all_skills
  });
}
