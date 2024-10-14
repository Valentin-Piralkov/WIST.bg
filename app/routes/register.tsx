import IndexHeader from "~/components/header";
import IndexFooter from "~/components/footer";
import RegisterCard from "~/components/registration/registerCard";

export default function Register() {
  return (
    <div className="flex flex-col justify-between items-center min-h-[100vh] h-full w-full bg-white gap-20">
      <IndexHeader isUserLoggedIn={false} profile_slug="" />
      <RegisterCard />
      <IndexFooter />
    </div>
  );
}
