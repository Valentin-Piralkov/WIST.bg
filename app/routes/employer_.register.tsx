import EmployerHeader from "~/components/employer/header";
import IndexFooter from "~/components/footer";
import EmployerRegistrationCard from "~/components/employer/registration/registerEmployerCard";
import { registerAction } from "~/.server/actions/employer/registerAction";
import { l } from "~/.server/loaders/registration";

export const action = registerAction;
export const loader = l;

export default function EmployerRegister() {
  return (
    <div className="flex flex-col justify-between items-center min-h-[100vh] h-full w-full bg-white gap-20">
      <EmployerHeader isUserLoggedIn={false} profile_slug="" />
      <EmployerRegistrationCard />
      <IndexFooter />
    </div>
  );
}
