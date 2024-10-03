import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { l } from "~/.server/loaders/profile";
import SelectedOffers from "~/components/profile/selectedOffers";

export const loader = l;

export default function Info() {
  const { t } = useTranslation();
  const data = useLoaderData<typeof loader>();

  const [formData, setFormData] = useState({
    first_name: data.user?.firstName || "",
    last_name: data.user?.lastName || "",
    email: data.user?.email || "",
    phone: data.user?.phone || "",
    occupation: data.user?.occupation || "",
    linkedin_profile: data.user?.linkedinProfile || ""
  });

  // Handler to update the form data as the user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  if (!data.user) {
    return <div>{t("user_not_found")}</div>;
  }

  return (
    <div className="flex flex-row items-start justify-between w-full gap-20">
      <div className="flex flex-col w-1/2 mt-6 justify-center items-start font-title font-medium text-xl">
        <h3>{t("edit_personal_info")}</h3>
        <Form method="post" className="space-y-6 mt-8 w-full">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium">
              {t("first_name")}
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder={t("first_name_placeholder")}
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-wist focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium">
              {t("last_name")}
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder={t("last_name_placeholder")}
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-wist focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              {t("email")}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("email_placeholder")}
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-wist focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="occupation" className="block text-sm font-medium">
              {t("occupation")}
            </label>
            <input
              type="text"
              name="occupation"
              id="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder={t("occupation_placeholder")}
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-wist focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              {t("phone")}
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("phone_placeholder")}
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-wist focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="linkedinProfile" className="block text-sm font-medium">
              {t("linkedin_profile")}
            </label>
            <input
              type="text"
              name="linkedinProfile"
              id="linkedinProfile"
              value={formData.linkedin_profile}
              onChange={handleChange}
              placeholder={t("linkedin_profile_placeholder")}
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-wist focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-1/2 py-2 px-4 rounded-md mt-4 bg-orange-wist hover:underline font-title text-white"
          >
            {t("edit_profile")}
          </button>
        </Form>
      </div>
      <div className="flex flex-col w-1/2 justify-start">
        <SelectedOffers />
      </div>
    </div>
  );
}
