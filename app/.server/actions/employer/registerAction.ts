import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { db } from "~/lib/db";
import { isValidPassword, isValidPhoneNumber } from "~/lib/utils/formatUtils";
import { createUserSession, registerEmployer } from "~/lib/utils/auth.server";
import { z } from "zod";

/**
 * This function is an action function that is called when an employer submits the registration form.
 * It receives the request object and extracts the form data from it.
 * It then performs any validation or user creation logic and redirects the employer to the home page.
 *
 * @param {ActionFunctionArgs} { request } - The registration form data
 * @returns {Promise} - Redirects the user to the home page
 */

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  password: z.string().min(6),
  repeat_password: z.string().min(6)
});

export async function registerAction({ request }: ActionFunctionArgs) {
  // get search params from URL
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const finalURL = searchParams.toString() ? `?${searchParams.toString()}&` : `?`;

  const formData = Object.fromEntries(await request.formData());

  const parsedData = registerSchema.safeParse(formData);

  if (!parsedData.success) {
    return redirect("/404");
  }

  const { name, email, phone, password, repeat_password } = parsedData.data;

  // check if all fields are filled
  if (!name || !email || !phone || !password || !repeat_password) {
    return redirect(`/employer/register${finalURL}error=please_fill_all_fields`);
  }

  // check if email already exists
  try {
    const company = await db.company.findUnique({
      where: { email: email.toLowerCase() }
    });
    if (company) {
      return redirect(`/employer/register${finalURL}error=email_already_exists`);
    }
  } catch (error) {
    console.error(error);
    return redirect("/505");
  }

  // validate password
  if (!isValidPassword(password)) {
    return redirect(`/employer/register${finalURL}error=invalid_password`);
  }

  if (password !== repeat_password) {
    return redirect(`/employer/register${finalURL}error=passwords_do_not_match`);
  }

  // validate phone number
  if (!isValidPhoneNumber(phone)) {
    return redirect(`/employer/register${finalURL}error=invalid_phone_number`);
  }

  // create company
  try {
    const company = await registerEmployer({ name, phone, email, password });
    if (company) {
      return createUserSession(
        company.id,
        "employer",
        `/employer/profile/${company.slug}/company_info${finalURL}success=registration_successful`
      );
    } else {
      console.error("Failed to create user session for: ", company);
      return redirect("/505");
    }
  } catch (error) {
    console.error(error);
    return redirect("/505");
  }
}
