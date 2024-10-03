import { Form } from "@remix-run/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface PreferencesState {
  newPosts: boolean;
  replies: boolean;
  marketing: boolean;
}

interface PreferenceToggleProps {
  label: string;
  isEnabled: boolean;
  onToggle: () => void;
}

export default function ProfileSettings() {
  const { t } = useTranslation();

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
          <button className="w-1/2 bg-blue-light text-white font-title font-medium text-xl px-4 py-2 rounded-md">
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
            isEnabled={preferences.newPosts}
            onToggle={() => togglePreference("newPosts")}
          />
          <PreferenceToggle
            label={t("replies")}
            isEnabled={preferences.replies}
            onToggle={() => togglePreference("replies")}
          />
          <PreferenceToggle
            label={t("marketing")}
            isEnabled={preferences.marketing}
            onToggle={() => togglePreference("marketing")}
          />
        </div>

        {/* Action Button */}
        <button className="mt-6 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none">
          {t("delete_profile")}
        </button>
      </div>
    </div>
  );
}

// Toggle Switch Component
function PreferenceToggle({ label, isEnabled, onToggle }: PreferenceToggleProps) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <button
        type="button"
        onClick={onToggle}
        className={`relative w-10 h-6 rounded-full transition-colors ${isEnabled ? "bg-blue-light" : "bg-gray-300"}`}
      >
        <span
          className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
            isEnabled ? "translate-x-4" : ""
          }`}
        ></span>
      </button>
    </div>
  );
}
