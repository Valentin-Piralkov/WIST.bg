import { useTranslation } from "react-i18next";
import ContactForm from "./contactForm";
import { ContactFormData } from "~/.server/actions/index/contactForm";
import { SUPPORTED_LOCALES } from "~/i18n";
import { useSwitchLanguage } from "~/hooks/useSwitchLanguage";
import { useLangSearchParams } from "~/hooks/useLangSerachParams";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/linkedin";
import "react-social-icons/facebook";
import "react-social-icons/instagram";
import "react-social-icons/youtube";

interface Props {
  actionData: ContactFormData | undefined;
}

export default function IndexFooter(props: Props) {
  const { t } = useTranslation();
  const switchLanguage = useSwitchLanguage();
  const langSearchParams = useLangSearchParams().get("lang") || "bg"; // language defaults to bg

  return (
    <div className="flex flex-col items-center justify-center w-full h-[40vh] shadow-md bg-blue-dark">
      <div className="flex flex-row items-center gap-4 justify-between w-10/12 h-5/6">
        <div className="flex flex-col items-start justify-between w-1/4 h-[25vh] overflow-auto">
          <img src="./uploads/Wist-White.svg" alt="WIST.bg" className="h-[5vh] text-white" />
          <div className="flex flex-col justify-start gap-2">
            <p className="text-white font-title text-l"> {t("slogan")} </p>
            <p className="text-white font-title text-l"> {t("contact_email")} </p>
            <p className="text-white font-title text-l"> {t("contact_phone")} </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-4">
            <SocialIcon url="https://www.facebook.com/" network="facebook" bgColor="#00B4D8" />
            <SocialIcon url="https://www.instagram.com/" network="instagram" bgColor="#00B4D8" />
            <SocialIcon url="https://www.linkedin.com" network="linkedin" bgColor="#00B4D8" />
            <SocialIcon url="https://www.youtube.com/" network="youtube" bgColor="#00B4D8" />
          </div>
        </div>
        <div className="flex flex-col items-start justify-between w-1/4 h-[25vh]">
          <div className="text-2xl text-white self-start font-title"> {t("fast_links")} </div>
          <a href={`/?lang=${langSearchParams}`} className="font-title font-bold text-l text-white">
            {" "}
            {t("home")}{" "}
          </a>
          <a href="/profile" className="font-title font-bold text-l text-white">
            {" "}
            {t("about")}{" "}
          </a>
          <a href="/about" className="font-title font-bold text-l text-white">
            {" "}
            {t("frequently_asked_questions")}{" "}
          </a>
          <div className="flex flex-row items-center justify-center gap-4 select-none text-white">
            {SUPPORTED_LOCALES.map((x) => (
              <div
                key={`locale-picker-${x}`}
                className={x === langSearchParams ? "underline cursor-pointer" : "cursor-pointer"}
                onClick={() => switchLanguage(x)}
              >
                {x.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-2/4 h-[25vh]">
          <ContactForm actionData={props.actionData} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-10/12 h-1/6 gap-4">
        <hr className="w-full border-1 border-white" />
        <div className="flex flex-row items-center justify-between w-full">
          <div className="text-white font-normal text-l">
            <FontAwesomeIcon icon={faCopyright} />
            {` Copyright WIST ${new Date().getFullYear()} All Rights Reserved`}
          </div>
          <div className="text-white font-normal text-l flex gap-4">
            <a href="/terms" className="text-white font-normal text-l hover:underline">
              Terms of Use
            </a>
            <span> | </span>
            <a href="/privacy" className="text-white font-normal text-l hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
