import { Form, redirect, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { employerSettingsAction } from "~/.server/actions/employer/profile/settingAction";
import { l } from "~/.server/loaders/employer/profile";
import { PreferenceToggle } from "~/components/elements/toggleButton";

interface PreferencesState {
  newCandidates: boolean;
  payslips: boolean;
  marketing: boolean;
}

export const loader = l;
export const action = employerSettingsAction;

export default function EmployerProfileSettings() {
  const { t } = useTranslation();
  const data = useLoaderData<typeof l>();

  const [preferences, setPreferences] = useState({
    newCandidates: data.company?.preferences?.newCandidates,
    payslips: data.company?.preferences?.payslips,
    marketing: data.company?.preferences?.marketing
  });

  const [emailData, setEmailData] = useState({
    email: data.company?.email || ""
  });

  if (
    !data ||
    !data.company ||
    !data.company.id ||
    !data.company.preferences ||
    !data.company.email ||
    !data.company.internships
  ) {
    return redirect("/505");
  }

  // Handler to update the form data as the user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  if (!data.company) {
    return <div>{t("company_not_found")}</div>;
  }

  const togglePreference = (key: keyof PreferencesState) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="flex flex-row items-start justify-between w-full gap-20">
      <div className="flex flex-col w-1/2 mt-6 gap-10 justify-normal items-start font-title font-medium text-xl">
        <h3>{t("profile_settings")}</h3>
        <Form method="post" className="space-y-6 w-full">
          <h4>{t("email")}</h4>
          <div>
            <input type="hidden" name="action" value="update_email" />
            <input type="hidden" name="id" value={data.company.id} />
            <label htmlFor="email" className="block text-sm font-medium">
              {t("email")}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={emailData.email}
              onChange={handleChange}
              placeholder={t("email_placeholder")}
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-wist focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-1/2 bg-blue-light text-white font-title font-medium text-xl px-4 py-2 rounded-md"
          >
            {t("change_email")}
          </button>
        </Form>
        <Form method="post" className="space-y-6 w-full">
          <input type="hidden" name="action" value="update_password" />
          <input type="hidden" name="id" value={data.company.id} />
          <h4>{t("password")}</h4>
          <div>
            <label htmlFor="current_password" className="block text-sm font-medium">
              {t("current_password")}
            </label>
            <input
              type="password"
              name="current_password"
              id="current_password"
              placeholder={t("password_placeholder")}
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-wist focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="new_password" className="block text-sm font-medium">
              {t("new_password")}
            </label>
            <input
              type="password"
              name="new_password"
              id="new_password"
              placeholder={t("password_placeholder")}
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-wist focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="confirm_password" className="block text-sm font-medium">
              {t("confirm_password")}
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder={t("password_placeholder")}
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-wist focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-1/2 bg-blue-light text-white font-title font-medium text-xl px-4 py-2 rounded-md"
          >
            {t("change_password")}
          </button>
        </Form>
      </div>
      <div className="flex flex-col w-1/2 mt-24 gap-10 justify-normal items-start font-title font-medium text-xl">
        <h4>{t("email_preferences")}</h4>
        {/* Preferences List */}
        <div className="flex flex-col w-full gap-4">
          <PreferenceToggle
            label={t("new_candidates")}
            isEnabled={preferences.newCandidates}
            name="newCandidates"
            id={data.company.id.toString()}
            onToggle={() => togglePreference("newCandidates")}
          />
          <PreferenceToggle
            label={t("payslips")}
            isEnabled={preferences.payslips}
            name="payslips"
            id={data.company.id.toString()}
            onToggle={() => togglePreference("payslips")}
          />
          <PreferenceToggle
            label={t("marketing")}
            isEnabled={preferences.marketing}
            name="marketing"
            id={data.company.id.toString()}
            onToggle={() => togglePreference("marketing")}
          />
        </div>

        {/* Delete Profile Button */}
        <Form method="post">
          <input type="hidden" name="action" value="delete" />
          <input type="hidden" name="id" value={data.company.id} />
          <button type="submit" className="mt-6 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none">
            {t("delete_profile")}
          </button>
        </Form>
      </div>
    </div>
  );
}
