import { loginAction } from "~/.server/actions/employer/loginAction";
import { l } from "~/.server/loaders/registration";
import EmployerHeader from "~/components/employer/header";
import EmployerLoginCard from "~/components/employer/registration/loginEmployerCard";
import IndexFooter from "~/components/footer";

export const loader = l;
export const action = loginAction;

export default function EmployerLogin() {
  return (
    <div className="flex flex-col justify-between items-center min-h-[100vh] h-full w-full bg-white gap-20">
      <EmployerHeader isUserLoggedIn={false} profile_slug="" />
      <EmployerLoginCard />
      <IndexFooter />
    </div>
  );
}
