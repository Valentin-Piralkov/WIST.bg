import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { settingsAction } from "~/.server/actions/profile/settingsAction";
import { l } from "~/.server/loaders/profile";
import { PreferenceToggle } from "~/components/elements/toggleButton";

interface PreferencesState {
  newPosts: boolean;
  replies: boolean;
  marketing: boolean;
}

export const loader = l;
export const action = settingsAction;

export default function ProfileSettings() {
  const { t } = useTranslation();
  const data = useLoaderData<typeof l>();

  const [preferences, setPreferences] = useState({
    newPosts: true,
    replies: true,
    marketing: true
  });

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
          <h4>{t("password")}</h4>
          <input type="hidden" name="action" value="update_password" />
          <input type="hidden" name="id" value={data.user.id} />
          <div>
            <label htmlFor="current_password" className="block text-sm font-medium">
              {t("current_password")}
            </label>
            <input
              type="password"
              name="current_password"
              id="current_password"
              placeholder={t("password_placeholder")}
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
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
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
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
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
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
            label={t("new_posts")}
            name="newPosts"
            id={data.user.id.toString()}
            isEnabled={preferences.newPosts}
            onToggle={() => togglePreference("newPosts")}
          />
          <PreferenceToggle
            label={t("replies")}
            name="replies"
            id={data.user.id.toString()}
            isEnabled={preferences.replies}
            onToggle={() => togglePreference("replies")}
          />
          <PreferenceToggle
            label={t("marketing")}
            name="marketing"
            id={data.user.id.toString()}
            isEnabled={preferences.marketing}
            onToggle={() => togglePreference("marketing")}
          />
        </div>

        {/* Action Button */}
        <Form method="post">
          <input type="hidden" name="action" value="delete" />
          <input type="hidden" name="id" value={data.user.id} />
          <button type="submit" className="mt-6 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none">
            {t("delete_profile")}
          </button>
        </Form>
      </div>
    </div>
  );
}
