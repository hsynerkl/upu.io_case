import { LogoIcon } from "@/assets/icons";
import { links } from "@/constants";
import { Link } from "@tanstack/react-router";
import Button from "./Button";
import Avatar from "@/assets/images/Avatar.png";
import SettingsIcon from "@/assets/icons/SettingsIcon";

const Sidebar = () => {
  return (
    <aside className="select-none w-20 xl:block hidden">
      <div className="flex flex-col h-full items-center">
        <Link
          to="/"
          className="flex px-2 pb-3 pt-8 items-center justify-center"
        >
          <LogoIcon className="w-10 h-10 fill-white" />
        </Link>

        <div className="h-full w-full flex justify-between flex-col">
          <div>
            {links.map((link, i) => (
              <Button link={link} key={i} />
            ))}
          </div>

          <div className="w-full pb-3">
            <Button
              animation="spin"
              link={{ title: "Settings", icon: <SettingsIcon />, href: "/" }}
            />

            <hr className="text-primary-5/40 mx-3" />

            <Button link={{ title: "Profile", href: "/" }}>
              <div className="bg-primary-3 h-10 w-10 rounded-full">
                <img src={Avatar} alt="avatar" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
