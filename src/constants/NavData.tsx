import { MrpIcon, ProductIcon, SavedIcon, VerifiedIcon } from "@/assets/icons";
import type { JSX } from "react";

export type NavDataItem = {
  href: string;
  icon: JSX.Element;
  title: string;
};

export const NavData: NavDataItem[] = [
  {
    href: "/",
    title: "Product",
    icon: <ProductIcon />,
  },
  {
    href: "/",
    title: "MRP",
    icon: <MrpIcon />,
  },
  {
    href: "/",
    //ne versem bilemedim
    title: "title 1",
    icon: <SavedIcon />,
  },
  {
    href: "/",
    //ne versem bilemedim
    title: "title 2",
    icon: <VerifiedIcon />,
  },
];
