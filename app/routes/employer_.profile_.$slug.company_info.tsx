import { useState } from "react";
import { Form, useNavigation } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { FaTrashAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function CompanyInfoForm() {
  const { t } = useTranslation();
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const handleSkillInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };

  const addSkill = () => {
    if (skillInput && !skills.includes(skillInput) && skills.length < 10) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
  };

  return (
    <div className="flex flex-col w-full mt-6 justify-normal items-start font-title font-medium text-xl gap-10">
      <h3>{t("company_info")}</h3>
      <Form method="post" encType="multipart/form-data" className="space-y-6 w-full">
        {/* Company Name */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-md font-medium">
              {t("company_name")}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder={t("company_name_placeholder")}
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-wist focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-md font-medium">
              {t("company_phone")}
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder={t("company_phone_placeholder")}
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-wist focus:border-transparent"
            />
          </div>
        </div>

        {/* Industry */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <label htmlFor="industry" className="block text-md font-medium">
              {t("industry")}
            </label>
            <input
              type="text"
              name="industry"
              id="industry"
              placeholder={t("industry_placeholder")}
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-wist focus:border-transparent"
            />
          </div>
          {/* Logo Upload */}
          <div>
            <label htmlFor="logo" className="block text-md font-medium text-gray-700">
              {t("company_logo")}
            </label>
            <div className="mt-1 flex items-center space-x-4">
              {/* Image Preview and File Upload */}
              <label
                htmlFor="logo"
                className="w-16 h-16 bg-gray-100 border rounded flex items-center justify-center cursor-pointer"
              >
                {logoFile ? (
                  <img
                    src={URL.createObjectURL(logoFile)}
                    alt="Logo preview"
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
                {/* Hidden File Input */}
                <input type="file" id="logo" name="logo" onChange={handleFileChange} className="hidden" />
              </label>

              {/* File Name and Delete Button */}
              {logoFile && (
                <div className="flex items-center space-x-2">
                  <p>{logoFile.name}</p>
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="text-black hover:text-gray-700"
                    aria-label="Remove logo"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              )}
              {!logoFile && (
                <div className="flex items-center space-x-2 text-md">
                  <p>{t("choose_logo")}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Website */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <label htmlFor="website" className="block text-md font-medium">
              {t("company_website")}
            </label>
            <input
              type="text"
              name="website"
              id="website"
              placeholder={t("company_website_placeholder")}
              className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-wist focus:border-transparent"
            />
          </div>
        </div>

        <hr className="w-full border-gray-light border rounded-md" />

        {/* Skills Input */}

        <div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* Input field container */}
            <div>
              <label htmlFor="skillsInput" className="block text-md font-medium">
                {t("choose_10_skills")}
              </label>
              <input
                type="text"
                id="skillsInput"
                value={skillInput}
                onChange={handleSkillInput}
                placeholder={t("choose_10_skills_placeholder")}
                className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-wist focus:border-transparent"
              />
            </div>
            {/* Button container */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={addSkill}
                className="w-1/4 px-3 py-2 rounded-md bg-orange-wist font-title text-white text-sm border border-orange-wist shadow-sm hover:bg-orange-700"
              >
                {t("add")}
              </button>
            </div>
          </div>

          {/* Skills List */}
          <div className="flex flex-wrap space-x-2">
            {skills.map((skill) => (
              <div key={skill} className="flex items-center mt-4 px-6 py-1 bg-gray-200 rounded-md space-x-1 gap-2">
                <span>{skill}</span>
                <button type="button" onClick={() => removeSkill(skill)} className="font-medium font-title">
                  <FontAwesomeIcon icon={faX} className="h-full" size="sm" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <hr className="w-full border-gray-light border rounded-md" />

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-md font-medium">
            {t("company_description")}
          </label>
          <textarea
            name="description"
            id="description"
            placeholder={t("company_description_placeholder")}
            rows={5}
            className="mt-1 block w-full px-3 py-2 font-normal border border-gray-light rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-wist focus:border-transparent"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-1/4 px-3 py-2 rounded-md bg-orange-wist font-title text-white text-sm border border-orange-wist shadow-sm hover:bg-orange-700 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? t("submitting") : t("save")}
          </button>
        </div>
      </Form>
    </div>
  );
}
