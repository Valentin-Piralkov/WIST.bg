import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { randomUUID } from "crypto";
import pkg from "bcryptjs";
import { db } from "~/lib/db";
import { isValidPassword, isValidPhoneNumber } from "~/lib/utils/formatUtils";
import { generateSlug } from "~/lib/utils/stringUtils";

/**
 * This function is an action function that is called when a user submits the registration form.
 * It receives the request object and extracts the form data from it.
 * It then performs any validation or user creation logic and redirects the user to the home page.
 *
 * @param {ActionFunctionArgs} { request } - The registration form data
 * @returns {Promise} - Redirects the user to the home page
 */

export async function registerAction({ request }: ActionFunctionArgs) {
  const { hash } = pkg;

  // get search params from URL
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const finalURL = searchParams.toString() ? `?${searchParams.toString()}&` : `?`;

  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("repeat_password") as string;

  if (!name || !email || !phone || !password || !confirmPassword) {
    return redirect(`/employer/register?error=please_fill_all_fields&${searchParams.toString()}`);
  }

  let company: any;

  try {
    company = await db.company.findUnique({
      where: { email: email.toLowerCase() }
    });
  } catch (error) {
    console.error(error);
    return redirect("/505");
  } finally {
    if (company) {
      return redirect(`/employer/register?error=email_already_exists&${searchParams.toString()}`);
    }
  }

  if (!isValidPassword(password)) {
    return redirect(`/employer/register?error=invalid_password&${searchParams.toString()}`);
  }

  if (password !== confirmPassword) {
    return redirect(`/employer/register?error=passwords_do_not_match&${searchParams.toString()}`);
  }

  if (!isValidPhoneNumber(phone)) {
    return redirect(`/employer/register?error=invalid_phone_number&${searchParams.toString()}`);
  }

  try {
    //hash the password
    const hashedPassword = await hash(password, 12);

    company = await db.company.create({
      data: {
        name: name,
        slug: randomUUID(),
        email: email.toLowerCase(),
        emailVerified: true,
        phone: phone,
        password: hashedPassword
      }
    });
  } catch (error) {
    console.error(error);
    return redirect("/505");
  } finally {
    if (!company) {
      return redirect(`/employer/register?error=account_created_error&${searchParams.toString()}`);
    }
  }

  const slug = generateSlug(name, company.id);

  try {
    company = await db.company.update({
      where: { id: company.id },
      data: { slug }
    });
  } catch (error) {
    console.error(error);
    return redirect("/505");
  } finally {
    if (!company || !company.slug || company.slug !== slug) {
      await db.user.delete({ where: { id: company.id } });
      return redirect(`/employer/register?error=account_created_error&${searchParams.toString()}`);
    }
  }

  // After processing, redirect the user
  return redirect(`/employer/login${finalURL}success=account_created_successfully`);
}
