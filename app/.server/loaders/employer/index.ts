import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getLocale } from "../../getLocale";
import { db } from "~/lib/db";
import { getUserSession } from "~/lib/utils/auth.server";

export async function l({ request }: LoaderFunctionArgs) {
  const locale = await getLocale(request);

  // get user session
  const session = await getUserSession(request);

  // input validation
  if (!session) {
    return redirect("/505");
  }

  // return data
  return json({
    locale,
    appURL: process.env.APP_URL,
    userId: session.userId || null,
    userType: session.userType || null
  });
}
