import { Form } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export default function ApplyForm() {
  const { t } = useTranslation();

  return (
    <div>
      <Form method="post" className="space-y-6 mt-8 pr-12 text-black">
        <div>
          <label htmlFor="name" className="block text-md font-medium text-white">
            {t("first_last_name")}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder={t("first_last_name_placeholder")}
            className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-light focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-md font-medium text-white">
            {t("email")}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder={t("email_placeholder")}
            className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-light focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-md font-medium text-white">
            {t("phone")}
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder={t("phone_placeholder")}
            className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-light focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="notice_period" className="block text-md font-medium text-white">
            {t("notice_period")}
          </label>
          <input
            type="text"
            name="notice_period"
            id="notice_period"
            placeholder={t("notice_period_placeholder")}
            className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-light focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="cv" className="block text-md font-medium text-white">
            {t("cv")}
          </label>
          <input
            type="file"
            name="cv"
            id="cv"
            accept=".pdf,.doc,.docx"
            className="mt-1 block w-full px-3 py-2 font-normal bg-white border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-light focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="cover_letter" className="block text-md font-medium text-white">
            {t("cover_letter")}
          </label>
          <input
            type="file"
            name="cover_letter"
            id="cover_letter"
            accept=".pdf,.doc,.docx"
            className="mt-1 block w-full px-3 py-2 font-normal bg-white border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-light focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="question_1" className="block text-md font-medium text-white">
            {t("question")} 1 ({t("optional")})
          </label>
          <textarea
            name="question_1"
            id="question_1"
            rows={6}
            placeholder={t("question_placeholder")}
            className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-light focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="question_2" className="block text-md font-medium text-white">
            {t("question")} 2 ({t("optional")})
          </label>
          <textarea
            name="question_2"
            id="question_2"
            rows={6}
            placeholder={t("question_placeholder")}
            className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-light focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-2/5 py-2 px-4 rounded-md mt-4 bg-orange hover:underline font-title text-white disabled:bg-gray-light disabled:cursor-not-allowed disabled:hover:no-underline"
        >
          {t("create_profile")}
        </button>
      </Form>
    </div>
  );
}
