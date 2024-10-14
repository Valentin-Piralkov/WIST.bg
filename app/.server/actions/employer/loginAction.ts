import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { createUserSession, loginEmployer } from "~/lib/utils/auth.server";
import { z } from "zod";

/**
 * This function is an action function that is called when an emploer submits the login form.
 * It receives the request object and extracts the form data from it.
 * It then performs any validation or user creation logic and redirects the user to the home page.
 *
 * @param {ActionFunctionArgs} { request } - The login form data
 * @returns {Promise} - Redirects the user to the home page
 */

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  remember_me: z.string().optional()
});

export async function loginAction({ request }: ActionFunctionArgs) {
  // get search params from URL
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const finalURL = searchParams.toString() ? `?${searchParams.toString()}&` : `?`;

  const formData = Object.fromEntries(await request.formData());

  const parsedData = loginSchema.safeParse(formData);

  if (!parsedData.success) {
    return redirect("/404");
  }

  const { email, password, remember_me } = parsedData.data;

  // check if all fields are filled
  if (!email || !password) {
    return redirect(`/employer/login${finalURL}error=please_fill_all_fields`);
  }

  // login employer and create session
  const company = await loginEmployer({ email, password });
  if (!company) return redirect(`/employer/login${finalURL}error=invalid_credentials`);

  return createUserSession(
    company.id,
    "employer",
    `/employer/profile/${company.slug}/company_info${finalURL}success=login_successful`
  );
}
