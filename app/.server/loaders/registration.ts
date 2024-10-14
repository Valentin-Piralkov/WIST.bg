import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getUserSession } from "~/lib/utils/auth.server";

export async function l({ request }: LoaderFunctionArgs) {
  // get search params from URL
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const finalURL = searchParams.toString() ? `?${searchParams.toString()}` : "";

  const session = await getUserSession(request);
  // if the user is already logged in, redirect them to home page
  if (session && session.userType === "user") {
    return redirect(`/${finalURL}`);
  }

  // if the employer is already logged in, redirect them to employer dashboard
  if (session && session.userType === "employer") {
    return redirect(`/employer/dashboard${finalURL}`);
  }

  return null;
}
