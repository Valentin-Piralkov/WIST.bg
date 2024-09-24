import IndexHeader from "~/components/header";
import IndexFooter from "~/components/footer";
import UserRegistrationCard from "~/components/registration/registerUserCard";
import { registerAction } from "~/.server/actions/register/registerAction";

export const action = registerAction;

export default function RegisterUser() {
  return (
    <div className="flex flex-col justify-between items-center min-h-[100vh] h-full w-full bg-white gap-20">
      <IndexHeader />
      <UserRegistrationCard />
      <IndexFooter />
    </div>
  );
}
