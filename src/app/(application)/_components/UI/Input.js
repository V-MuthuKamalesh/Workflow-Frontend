"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  title,
  errorMessage,
  cssClasses = "",
  type = "text",
  ...props
}) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="w-full mt-3 relative">
      <p className="text-gray-600">{title}</p>
      <div className="relative">
        <input
          className={`w-full outline-none border border-gray-300 p-2 rounded-sm pr-10 ${cssClasses}`}
          type={inputType}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {errorMessage && (
        <span className="text-red-600 text-xs mb-4">{errorMessage}</span>
      )}
    </div>
  );
}
