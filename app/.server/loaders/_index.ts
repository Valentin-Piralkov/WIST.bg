import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getLocale } from "../getLocale";
import { db } from "~/lib/db";
import { getUserSession } from "~/lib/utils/auth.server";

export async function l({ request }: LoaderFunctionArgs) {
  const locale = await getLocale(request);

  const filters = await db.category.findMany({
    include: {
      options: true
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

  const session = await getUserSession(request);

  if (session && session.userId) {
    const user = await db.user.findUnique({
      where: {
        id: session.userId
      }
    });

    return json({
      locale,
      appURL: process.env.APP_URL,
      filters,
      companies,
      profile_slug: user?.slug || null,
      userId: session.userId,
      userType: session.userType
    });
  }

  return json({
    locale,
    appURL: process.env.APP_URL,
    filters,
    companies,
    profile_slug: null,
    userId: null,
    userType: null
  });
}
