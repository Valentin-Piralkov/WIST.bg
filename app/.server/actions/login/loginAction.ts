import { ActionFunctionArgs, redirect } from "@remix-run/node";

/**
 * This function is an action function that is called when a user submits the login form.
 * It receives the request object and extracts the form data from it.
 * It then performs any validation or user creation logic and redirects the user to the home page.
 *
 * @param {ActionFunctionArgs} { request } - The login form data
 * @returns {Promise} - Redirects the user to the home page
 */

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const remember_me = formData.get("remember_me");

  if (!email || !password) {
    return redirect("/register?error=Please fill in all fields");
  }

  console.log("User logged in with email:", email);
  console.log("Remember me:", remember_me);

  // Perform any validation or user creation logic here
  // For example, you might create a user in Firebase:

  // await createUserInFirebase({ name, email, password });

  // After processing, redirect the user
  return redirect("/");
}
