import { filters } from "@/constants";
import useProductPlanningStore from "@/store/useProductPlanningStore";
import clsx from "clsx";

const FiltersTab = () => {
  const { selectedFilter, setSelectedFilter } = useProductPlanningStore();

  return (
    <div className="border select-none flex border-primary-3 bg-primary-3 p-1 my-2 container-shadow rounded-md text-sm">
      {filters.map((item) => (
        <div
          key={item.id}
          className={clsx(
            "py-1 px-1 xl:px-2 text-center flex-1 whitespace-nowrap rounded-md cursor-pointer transition-colors",
            selectedFilter === item.id
              ? "bg-primary-6 text-white"
              : "bg-primary-3"
          )}
          onClick={() => setSelectedFilter(item.id)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default FiltersTab;
