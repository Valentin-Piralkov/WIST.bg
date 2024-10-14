import { Form } from "@remix-run/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function EmployerLoginCard() {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Handler to update the form data as the user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Check if all fields are filled
  const isFormValid = formData.email !== "" && formData.password !== "";

  // Handler to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col px-8 py-6 w-1/3 justify-center items-center font-title font-medium text-xl">
      <h2>{t("login_text")}</h2>
      <div className="flex flex-row w-full justify-center items-center gap-4 mt-4">
        <h5>{t("dont_have_account")}</h5>{" "}
        <a href="/register" className="text-orange hover:underline">
          {" "}
          <h5> {t("create_profile")} </h5>
        </a>
      </div>

      <Form method="post" className="space-y-6 mt-8 w-full">
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
            className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            {t("password")}
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t("password_placeholder")}
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-light"
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
              ) : (
                <FaEye className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
          <p className="text-xs text-right hover:underline mt-2">{t("forgot_password")}</p>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <input
            type="checkbox"
            name="remember_me"
            defaultChecked={false}
            id="remember_me"
            className="size-5 rounded-md text-orange accent-orange focus:ring-0"
          />
          <label htmlFor="remember_me" className="block text-sm font-medium">
            {t("remember_me")}
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md mt-4 bg-blue-light hover:underline font-title text-white disabled:bg-gray-light disabled:cursor-not-allowed disabled:hover:no-underline"
          disabled={!isFormValid}
        >
          {t("login")}
        </button>
      </Form>
    </div>
  );
}
