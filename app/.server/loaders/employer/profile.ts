import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getLocale } from "../../getLocale";
import { db } from "~/lib/db";
import { getUserSession } from "~/lib/utils/auth.server";

export async function l({ request, params }: LoaderFunctionArgs) {
  const locale = await getLocale(request);

  const slug = params["slug"];

  const sections = await db.employerSection.findMany();

  // get search params from URL
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const finalURL = searchParams.toString() ? `?${searchParams.toString()}` : "";

  // get company data based on slug
  const company = await db.company.findUnique({
    where: {
      slug: slug
    },
    omit: {
      password: true
    },
    include: {
      internships: true,
      preferences: true
    }
  });

  // get user session
  const session = await getUserSession(request);

  // input validation
  if (!session) {
    return redirect("/505");
  }

  if (!session.userId || !session.userType) {
    return redirect(`/employer/login${finalURL}`);
  }

  if (session.userType !== "employer") {
    return redirect("/404");
  }

  if (!company) {
    return redirect("/404");
  }

  // check if user is authorized to view this page
  if (session.userId !== company.id) {
    return redirect("/404");
  }

  const all_skills = await db.skill.findMany();

  // return data
  return json({
    locale,
    appURL: process.env.APP_URL,
    sections,
    company,
    all_skills,
    userId: session.userId,
    userType: session.userType
  });
}
