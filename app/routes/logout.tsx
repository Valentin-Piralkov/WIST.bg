// app/routes/logout.tsx
import { logoutAction } from "~/.server/actions/login/logoutAction";

export const action = logoutAction;

export default function LogoutRoute() {
  return null; // This route doesn't need to render anything
}
