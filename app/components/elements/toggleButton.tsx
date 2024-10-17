import { useFetcher } from "@remix-run/react";

interface PreferenceToggleProps {
  label: string;
  isEnabled: boolean;
  name: string;
  id: string;
  onToggle: () => void;
}

// Toggle Switch Component
export function PreferenceToggle({ label, isEnabled, name, id, onToggle }: PreferenceToggleProps) {
  const fetcher = useFetcher();
  const handleToggle = () => {
    // Optimistically update the state
    onToggle();

    // Submit the preference change
    fetcher.submit(
      {
        action: "update_preference",
        id: id,
        preference: name,
        value: isEnabled ? "off" : "on"
      },
      { method: "post" }
    );
  };
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <button
        type="button"
        onClick={handleToggle}
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
