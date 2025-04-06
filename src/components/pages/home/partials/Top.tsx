import { FlexIcon, GridIcon } from "@/assets/icons";
import Select from "@/components/commons/ui/Select";
import clsx from "clsx";
import type { FC, ReactNode } from "react";
import type { DesignType } from "../types";
import { tabs } from "@/constants";
import useProductPlanningStore from "@/store/useProductPlanningStore";

type TopProps = {
  design: DesignType;
  onDesignChange: (design: DesignType) => void;
};

const designOptions: { type: DesignType; icon: ReactNode }[] = [
  { type: "grid", icon: <GridIcon className="h-4 w-4 fill-white" /> },
  { type: "flex", icon: <FlexIcon className="h-4 w-4 fill-white" /> },
];

const Top: FC<TopProps> = ({ design, onDesignChange }) => {
  const { activeTab, setActiveTab } = useProductPlanningStore();

  return (
    <div className="flex xl:flex-row flex-col xl:items-center xl:justify-between">
      <div className="flex mx-auto xl:mx-0 text-lg gap-2.5 xl:gap-5">
        <h2 className="font-semibold text-white">
          uwu.
          <span className="text-primary-2">order</span>
        </h2>

        <p className="font-light">CNC Torna Planlama</p>
      </div>

      <div className="flex items-center justify-between">
        <Select
          className="mt-4 mb-2 xl:hidden block"
          options={tabs}
          activeOption={activeTab}
          onSelect={setActiveTab}
        />

        <div className="hidden xl:flex p-1 gap-1 mt-2 xl:mt-0 rounded-md container-shadow bg-primary-6">
          {designOptions.map((option) => (
            <div
              key={option.type}
              onClick={() => onDesignChange(option.type)}
              className={clsx(
                "p-1 cursor-pointer rounded-sm",
                design === option.type ? "bg-primary-1" : "bg-transparent"
              )}
            >
              {option.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Top;
