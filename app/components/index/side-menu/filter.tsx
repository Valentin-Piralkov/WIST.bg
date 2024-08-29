import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Filter, FilterOption } from "~/types/FilterTypes";

type Props<T extends string> = {
  label: T;
  options: FilterOption<T>[];
};

export default function IndexFilter<T extends string>({ label, options }: Props<T>) {
  const { t } = useTranslation();

  const [openSection, setOpenSection] = useState<boolean>(false);

  const [filterOptions, setFilterOptions] = useState<Filter<T>>({
    label: label,
    options: options
  });

  const handleSectionToggle = () => {
    setOpenSection((prev) => !prev);
  };

  const handleChange = (name: T, value: boolean) => {
    setFilterOptions((prev) => ({
      ...prev,
      options: prev.options.map((option) => (option.label === name ? { ...option, value } : option))
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={() => handleSectionToggle()}
        className="flex justify-between focus:outline-none font-title text-xl"
      >
        <span>{t(label)}</span>
        <span>{openSection ? "﹀" : "〉"}</span>
      </button>
      {openSection && (
        <div className="flex flex-col gap-4 pl-4 bg-white">
          {filterOptions.options.map((option, index) => (
            <label key={index} className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={option.value}
                onChange={() => handleChange(option.label, !option.value)}
              />
              <span className="ml-2 font-normal">{t(option.label)}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
