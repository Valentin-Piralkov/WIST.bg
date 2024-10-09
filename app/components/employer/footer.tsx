import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

export default function EmployerFooter() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-20 shadow-md bg-blue-dark">
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
