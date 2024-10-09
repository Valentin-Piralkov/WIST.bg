import { Section } from "~/types/FilterTypes";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useSearchParams } from "@remix-run/react";
import { useMemo } from "react";
import clsx from "clsx";

interface Props<T extends string> {
  sections: Section<T>[];
  slug: string;
}

export default function EmployerProfileSections<T extends string>({ sections, slug }: Props<T>) {
  const location = useLocation();

  // Get the search params in the URL for navigation:
  const [searchParams] = useSearchParams();

  const selectedSection = useMemo(() => {
    const last = location.pathname.split("/").pop();

    if (!last) {
      return null;
    }

    return last;
  }, [location.pathname]);

  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-normal text-left gap-4 mb-4">
      <span className="text-xl font-title font-bold text-left">{t("your_profile")}</span>
      <hr className="border-1 border-gray-light" />
      {sections.map((section, index) => (
        <div key={index} className="flex flex-col gap-4">
          <button
            type="button"
            className={clsx(
              "relative flex justify-between font-title text-xl cursor-pointer text-left",
              selectedSection === section.label ? "text-orange-wist" : ""
            )}
          >
            <Link
              to={`/employer/profile/${slug}/${section.label}?${searchParams.toString()}`}
              className={clsx("relative", selectedSection === section.label ? "my-button-selected" : "my-button")}
            >
              {t(section.label)}{" "}
            </Link>
          </button>
          <hr className="border-1 border-gray-light" />
        </div>
      ))}
    </div>
  );
}
