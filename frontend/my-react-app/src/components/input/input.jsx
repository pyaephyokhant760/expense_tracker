import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex flex-col gap-1">
      {label && (
        <label className="text-[13px] text-slate-800">
          {label}
        </label>
      )}

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={
          type === "password"
            ? showPassword
              ? "text"
              : "password"
            : type
        }
        className="border px-3 py-2 rounded-md pr-10"
      />

      {type === "password" && (
        <span
          className="absolute right-3 top-[32px] cursor-pointer text-slate-500"
          onClick={toggleShowPassword}
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </span>
      )}
    </div>
  );
};

export default Input;
