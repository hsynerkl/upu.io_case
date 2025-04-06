import clsx from "clsx";
import type { Tab } from "../types";
import { tabs } from "@/constants";
import useProductPlanningStore from "@/store/useProductPlanningStore";

const TabNavigation = () => {
  const { activeTab, setActiveTab } = useProductPlanningStore();

  return (
    <div className="xl:block text-white hidden select-none">
      <div className="flex gap-3 mt-4 text-sm font-light">
        {tabs.map((tab: Tab) => (
          <button
            className={clsx(
              "px-4 whitespace-nowrap py-2 container-shadow border-b-2 border-transparent relative z-10 cursor-pointer bg-primary-6",
              activeTab === tab.id
                ? "text-primary-2 border-b-primary-2 rounded-t-md"
                : "rounded-md"
            )}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
