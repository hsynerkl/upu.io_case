import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import type { FC, JSX, ReactNode } from "react";

type LinkProps = {
  href: string;
  icon?: JSX.Element;
  title: string;
};

type ButtonProps = {
  link: LinkProps;
  children?: ReactNode;
  animation?: "spin";
};

const Button: FC<ButtonProps> = ({ link, children, animation }) => {
  return (
    <div className="relative group">
      <Link
        className={clsx(
          "flex flex-col items-center gap-1.5 p-2.5 [&>svg]:h-6 active:opacity-80 [&>svg]:w-6 [&>svg]:fill-primary-5 [&>svg]:stroke-primay-6 hover:[&>svg]:fill-white",
          animation === "spin" && "[animation:spin_3s_linear_infinite]"
        )}
        to={link.href}
      >
        {children || link?.icon}
      </Link>

      <div className="absolute z-20 left-full ml-2 top-1/2 -translate-y-1/2 bg-primary-7 px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible font-medium text-white container-shadow before:content-[''] before:absolute before:top-1/2 before:-left-1 before:-translate-y-1/2 before:border-solid before:border-y-4 before:border-r-4 before:border-l-0 before:border-y-transparent before:border-r-primary-7 pointer-events-none">
        {link.title}
      </div>
    </div>
  );
};

export default Button;
