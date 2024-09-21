import { Form } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";

export default function UserRegistrationCard() {
  const { t } = useTranslation();

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
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Име и фамилия
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Моля въведете име и фамилия"
            className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Имейл адрес
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Моля въведете имейл адрес"
            className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm"
            required
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium">
            Създайте своята парола
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Моля въведете парола"
            className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm"
            required
          />
          <p className="text-xs">Използвайте поне 8 символа и име от числа, цифри и малки и големи букви.</p>
        </div>

        <p className="text-sm mt-4">
          Създавайки вашия профил вие се съгласявате с нашата{" "}
          <a href="/" className="font-bold hover:underline">
            правила за употреба
          </a>{" "}
          и{" "}
          <a href="/" className="font-bold hover:underline">
            политика за поверителност
          </a>
          .
        </p>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md mt-4 bg-blue-light hover:underline font-title text-white disabled:bg-gray-light disabled:cursor-not-allowed"
          disabled={true}
        >
          Създай профил
        </button>
      </Form>

      <div className="mt-6 text-center w-full">
        <p className="mb-3">Или продължете с:</p>
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
