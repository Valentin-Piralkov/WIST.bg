import IndexFooter from "~/components/footer";
import EmployerHeader from "~/components/employer/header";

export default function Index() {
  return (
    <div className="flex flex-col justify-between min-h-[100vh] h-full w-full bg-white gap-20">
      <EmployerHeader />
      <div className="flex flex-row self-center gap-20 w-10/12 ">contehrheehn</div>
      <IndexFooter />
    </div>
  );
}
