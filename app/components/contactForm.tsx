import { Form, useActionData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { action } from "~/routes/contact";

export default function ContactForm() {
  const actionData = useActionData<typeof action>();
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col justify-start h-full">
      <div className="text-2xl text-white font-title"> {t("contact_form")} </div>
      <Form
        action="/contact"
        method="post"
        preventScrollReset
        className="flex flex-col w-full items-center justify-between mt-8 self-start overflow-hidden"
      >
        <div className="flex flex-col w-full">
          <div className="flex flex-row gap-8 w-full">
            <input
              name="name"
              type="text"
              placeholder={t("name")}
              required
              className="text-l w-full rounded-md px-4 py-2 font-title font-normal focus:outline-none"
            />
            <input
              name="email"
              type="email"
              placeholder={t("email")}
              required
              className="text-l w-full rounded-md px-4 py-2 font-title font-normal focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-light text-white px-4 py-2 rounded-md min-w-[12vh] font-title font-normal text-l hover:underline"
            >
              {t("submit")}
            </button>
          </div>
          <textarea
            name="message"
            placeholder={t("message")}
            required
            className="text-l w-full h-[10vh] rounded-md mt-8 px-4 py-2 font-title font-normal focus:outline-none resize-none"
          />
          {actionData?.ok && <div className="text-xl">{actionData.message.message}</div>}
          {actionData?.ok === false && <div className="text-xl text-[#ff3333]">{actionData.message}</div>}
        </div>
      </Form>
    </div>
  );
}
