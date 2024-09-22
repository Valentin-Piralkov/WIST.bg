import { Form } from "@remix-run/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaGoogle, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";

export default function UserRegistrationCard() {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    repeat_password: ""
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
  const isFormValid =
    formData.name !== "" &&
    formData.email !== "" &&
    formData.phone !== "" &&
    formData.password !== "" &&
    formData.repeat_password !== "";

  // Handler to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col px-8 py-6 w-1/3 justify-center items-center font-title font-medium text-xl">
      <h2>{t("create_profile")}</h2>
      <div className="flex flex-row w-full justify-center items-center gap-4 mt-4">
        <h5>{t("create_profile_text")}</h5>{" "}
        <a href="/login" className="text-orange hover:underline">
          {" "}
          <h5> {t("login_text")} </h5>
        </a>
      </div>

      <Form method="post" className="space-y-6 mt-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            {t("first_last_name")}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("first_last_name_placeholder")}
            className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
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
            className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
            required
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
            className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            {t("create_password")}
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
          <p className="text-xs">{t("password_instructions")}</p>
        </div>

        <div>
          <label htmlFor="repeat_password" className="block text-sm font-medium">
            {t("repeat_password")}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="repeat_password"
            id="repeat_password"
            value={formData.repeat_password}
            onChange={handleChange}
            placeholder={t("repeat_password_placeholder")}
            className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
            required
          />
        </div>

        <p className="text-sm mt-4">
          {t("by_clicking")}{" "}
          <a href="/" className="font-bold hover:underline">
            {t("terms_and_conditions")}
          </a>{" "}
          {t("and")}{" "}
          <a href="/" className="font-bold hover:underline">
            {t("privacy_policy")}
          </a>
          .
        </p>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md mt-4 bg-blue-light hover:underline font-title text-white disabled:bg-gray-light disabled:cursor-not-allowed disabled:hover:no-underline"
          disabled={!isFormValid}
        >
          {t("create_profile")}
        </button>
      </Form>

      <div className="mt-6 text-center w-full">
        <div className="flex items-center my-6">
          <div className="flex-grow border-t-2 border-gray-light"></div>
          <span className="mx-4">{t("or_continue_with")}</span>
          <div className="flex-grow border-t-2 border-gray-light"></div>
        </div>
        <div className="flex justify-center space-x-4 w-full">
          <button className=" p-2 rounded-md border border-gray-light">
            <div className="flex flex-row items-center gap-2 w-full">
              <FaFacebook />
              Facebook
            </div>
          </button>
          <button className="p-2 rounded-md border border-gray-light">
            <div className="flex flex-row items-center gap-2 w-full">
              <FaGoogle />
              Google
            </div>
          </button>
          <button className="p-2 rounded-md border border-gray-light">
            <div className="flex flex-row items-center gap-2 w-full">
              <FaApple />
              Apple
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
