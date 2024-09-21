import { ActionFunctionArgs, redirect } from "@remix-run/node";

export async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return redirect("/register?error=Please fill in all fields");
  }

  // Perform any validation or user creation logic here
  // For example, you might create a user in Firebase:

  // await createUserInFirebase({ name, email, password });

  // After processing, redirect the user
  return redirect("/dashboard");
}
