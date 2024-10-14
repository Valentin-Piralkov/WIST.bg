import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getLocale } from "../getLocale";
import { db } from "~/lib/db";
import { getUserSession } from "~/lib/utils/auth.server";
import { profile } from "console";

export async function l({ request, params }: LoaderFunctionArgs) {
  const locale = await getLocale(request);

  const slug = params["slug"];

  const internship = await db.internship.findUnique({
    where: {
      slug: slug
    },
    include: {
      Company: {
        select: {
          name: true,
          slug: true
        }
      }
    }
  });

  const session = await getUserSession(request);

  if (!session) {
    return redirect("/505");
  }

  if (!session.userId || !session.userType) {
    return json({
      locale,
      appURL: process.env.APP_URL,
      internship,
      profile_slug: null,
      userId: null,
      userType: null
    });
  }

  const user = await db.user.findUnique({
    where: {
      id: session.userId
    }
  });

  return json({
    locale,
    appURL: process.env.APP_URL,
    internship,
    profile_slug: user?.slug || null,
    userId: session.userId,
    userType: session.userType
  });
}
