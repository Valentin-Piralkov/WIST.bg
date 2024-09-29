import { useTranslation } from "react-i18next";
import { Internship } from "~/types/JobTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

interface Props {
  internship: Internship;
}

export default function JobOfferMain({ internship }: Props) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col py-8 w-2/3 justify-center items-start font-title font-medium text-xl">
      <div className="flex flex-row w-full h-full justify-between items-center">
        <div className="flex flex-row justify-between items-center gap-4">
          <button className="bg-blue-light text-white h-full font-title font-medium text-xl px-4 py-2 rounded-md">
            {t("apply")}
          </button>
          <button className="bg-orange text-white font-title font-medium text-xl px-4 py-2 rounded-md">
            {t("apply_with_wist")}
          </button>
        </div>
        <button className="bg-white font-title font-medium text-xl px-4 py-2 rounded-md border border-gray-light">
          {t("save")}
          <FontAwesomeIcon icon={faBookmark} className="h-full ml-4" />
        </button>
      </div>
      <hr className="w-full my-8 border-gray-light border rounded-md" />
      <div className="flex flex-row w-full justify-normal items-center gap-4">
        <button className="bg-white font-body font-medium text-xl px-4 py-2 rounded-md border border-gray-light">
          Java
        </button>
        <button className="bg-white font-body font-medium text-xl px-4 py-2 rounded-md border border-gray-light">
          Adobe Photoshop
        </button>
        <button className="bg-white font-body font-medium text-xl px-4 py-2 rounded-md border border-gray-light">
          SCRUM
        </button>
        <button className="bg-white font-body font-medium text-xl px-4 py-2 rounded-md border border-gray-light">
          English
        </button>
        <button className="bg-white font-body font-medium text-xl px-4 py-2 rounded-md border border-gray-light">
          Customer Service
        </button>
      </div>
      <hr className="w-full my-8 border-gray-light border rounded-md" />
      <div dangerouslySetInnerHTML={{ __html: internship.description }} />
      <div className="flex flex-row my-8 justify-between items-center gap-4">
        <button className="bg-blue-light text-white font-title font-medium text-xl px-4 py-2 rounded-md">
          {t("apply")}
        </button>
        <button className="bg-orange text-white font-title font-medium text-xl px-4 py-2 rounded-md">
          {t("apply_with_wist")}
        </button>
      </div>
    </div>
  );
}
