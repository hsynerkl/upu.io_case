import { CrossedOutIcon, MagnifierIcon } from "@/assets/icons";
import type { FC, ChangeEvent } from "react";
import clsx from "clsx";

type InputProps = {
  searchQuery?: string;
  clearSearch?: () => void;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  showMagnifier?: boolean;
  label?: string;
  type?: "text" | "number" | "email" | "password";
  className?: string;
};

const Input: FC<InputProps> = ({
  searchQuery = "",
  clearSearch = () => {},
  value,
  onChange,
  placeholder,
  showMagnifier = false,
  label,
  type = "text",
  className = "",
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-white mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {showMagnifier && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifierIcon className="h-5 fill-primary-6 w-5 text-primary-500" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={clsx(
            "w-full py-2 pr-3 placeholder:text-primary-5 text-white text-sm rounded-md border border-primary-3 container-shadow focus:outline-none",
            showMagnifier ? "pl-10" : "pl-3",
            searchQuery && "pr-8"
          )}
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-500 cursor-pointer hover:text-white"
          >
            <CrossedOutIcon className="h-5 w-5 fill-primary-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
