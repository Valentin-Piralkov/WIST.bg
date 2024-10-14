import { ActionFunctionArgs } from "@remix-run/node";
import { logout } from "~/lib/utils/auth.server";

/**
 * This function is an action function that is called when a user clicks the logout button.
 * It receives the request object and logs the user out.
 *
 * @param {ActionFunctionArgs} { request } - The request object
 * @returns {Promise} - Logs the user out
 **/

export async function logoutAction({ request }: ActionFunctionArgs) {
  return logout(request);
}
