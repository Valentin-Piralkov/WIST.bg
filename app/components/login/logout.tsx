import { Form } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export default function Logout() {
  const { t } = useTranslation();
  return (
    <Form action="/logout" method="post">
      <button type="submit" className="font-title font-normal text-xl hover:underline">
        {t("logout")}
      </button>
    </Form>
  );
}
