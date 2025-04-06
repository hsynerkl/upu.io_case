import { type FC } from "react";
import clsx from "clsx";
import type { ReactNode } from "@tanstack/react-router";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  className?: string;
};

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "inline-flex justify-center cursor-pointer px-4 py-2 text-sm font-medium border border-transparent rounded-md focus:outline-none",
        {
          "bg-primary-2 text-white hover:bg-primary-2/80 active:bg-primary-2/100":
            variant === "primary",

          "bg-primary-1 text-white hover:bg-primary-1/80 active:bg-primary-1/100":
            variant === "secondary",
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
