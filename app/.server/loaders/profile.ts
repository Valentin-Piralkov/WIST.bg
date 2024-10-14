import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getLocale } from "../getLocale";
import { db } from "~/lib/db";
import { getUserSession } from "~/lib/utils/auth.server";

export async function l({ request, params }: LoaderFunctionArgs) {
  const locale = await getLocale(request);

  const slug = params["slug"];

  // get search params from URL
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const finalURL = searchParams.toString() ? `?${searchParams.toString()}` : "";

  const sections = await db.section.findMany();

  const session = await getUserSession(request);

  // input validation
  if (!session) {
    return redirect("/505");
  }

  if (!session.userId || !session.userType) {
    return redirect(`/login${finalURL}`);
  }

  if (session.userType !== "user") {
    return redirect("/404");
  }

  const user = await db.user.findUnique({
    where: {
      slug: slug
    },
    omit: {
      password: true
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
          Company: {
            select: {
              name: true,
              slug: true
            }
          }
        }
      })
    : [];

  if (!user) {
    return redirect("/404");
  }

  // check if user is authorized to view this page
  if (session.userId !== user.id) {
    return redirect("/404");
  }

  return json({
    locale,
    appURL: process.env.APP_URL,
    sections,
    user,
    savedInternships,
    userId: session.userId,
    userType: session.userType
  });
}
