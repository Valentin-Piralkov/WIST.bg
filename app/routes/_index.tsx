import { l } from "~/.server/loaders/_index";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LOCALES } from "~/i18n";
import { useSwitchLanguage } from "~/hooks/useSwitchLanguage";
import ContactForm from "~/components/index/contactForm";
import { contactFormAction } from "~/.server/actions/index/contactForm";
import IndexHeader from "~/components/index/header";
import IndexFooter from "~/components/index/footer";

export const loader = l;
export const action = contactFormAction;

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { t } = useTranslation();
  const switchLanguage = useSwitchLanguage();

  return (
    <div className="flex flex-col justify-between min-h-[100vh] h-full w-full bg-white gap-8">
      <IndexHeader />
      <div className="flex flex-col items-center justify-center gap-4"> Main content </div>
      <IndexFooter actionData={actionData} />
      {/* <div className="text-2xl">{t("hi")}</div>
      <div className="flex flex-col items-center justify-center">
        <div className="">Language</div>
        <div className="flex flex-row items-center justify-center gap-4 select-none">
          {SUPPORTED_LOCALES.map((x) => (
            <div key={`locale-picker-${x}`} className="underline cursor-pointer" onClick={() => switchLanguage(x)}>
              {x}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-lg">Try to add &quot;message=hi&quot; as a search param to the URL.</div>
        <div className="text-lg">Example: {data.appURL}?lang=bg&message=hi</div>
        <div className="text-xl">loader: {data.helloMessage.message}</div>
      </div> */}
    </div>
  );
}
