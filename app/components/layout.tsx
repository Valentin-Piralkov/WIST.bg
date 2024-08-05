import { ReactNode } from "react";

type Props = {
  lang: "bg" | "en";
  children: ReactNode | ReactNode[] | undefined;
};

export default function AlimcoLayout(props: Props) {
  return <div className="flex flex-col min-h-[100vh] h-full w-full bg-lightest-gray">{props.children}</div>;
}
