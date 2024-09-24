import IndexHeader from "~/components/header";
import IndexFooter from "~/components/footer";
import UserLoginCard from "~/components/login/loginCard";
import { loginAction } from "~/.server/actions/login/loginAction";

export const action = loginAction;

export default function RegisterUser() {
  return (
    <div className="flex flex-col justify-between items-center min-h-[100vh] h-full w-full bg-white gap-20">
      <IndexHeader />
      <UserLoginCard />
      <IndexFooter />
    </div>
  );
}
