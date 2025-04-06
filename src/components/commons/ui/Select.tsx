import { useState, useRef, useEffect, type FC } from "react";
import clsx from "clsx";

export interface Option {
  id: string;
  label: string;
}

export interface SelectProps {
  options: Option[];
  activeOption: string;
  onSelect: (optionId: string) => void;
  className?: string;
}

const Select: FC<SelectProps> = ({
  options,
  activeOption,
  onSelect,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOptionLabel =
    options.find((option) => option.id === activeOption)?.label ||
    options[0]?.label ||
    "";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative text-sm ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-44 px-4 py-3 bg-primary-6 text-sm text-white rounded-md cursor-pointer font-medium container-shadow"
      >
        <span>{activeOptionLabel}</span>
        <svg
          className={`ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-20 w-44 max-h-44 mt-1 overflow-y-auto container-shadow bg-primary-6 rounded-md shadow-lg">
          {options.map((option) => (
            <button
              type="button"
              key={option.id}
              className={clsx(
                "block w-full text-left cursor-pointer px-4 py-3 text-primary-5 transition-colors",
                activeOption === option.id
                  ? "bg-primary-2 text-white font-medium"
                  : "hover:bg-primary-2 hover:text-white"
              )}
              onClick={() => {
                onSelect(option.id);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
