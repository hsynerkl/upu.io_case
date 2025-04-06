import { type FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import type { Product } from "@/types/product";
import type { DesignType } from "../../../types";
import clsx from "clsx";
import ProductCard from "@/components/commons/ProductCard";

interface PlannedProductsListProps {
  plannedProducts: Product[];
  design: DesignType;
}

const PlannedProductsList: FC<PlannedProductsListProps> = ({
  plannedProducts,
  design,
}) => {
  return (
    <Droppable droppableId="plannedProductsList" direction="vertical">
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="xl:col-span-8 rounded-md xl:overflow-y-auto"
            style={{
              opacity: snapshot.isDraggingOver ? 0.7 : 1,
            }}
          >
            <div
              className={clsx(
                "gap-3",
                design === "grid" ? "grid xl:grid-cols-2" : "flex flex-col"
              )}
            >
              {plannedProducts.map((item) => (
                <ProductCard key={`planned-${item.id}`} product={item} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};

export default PlannedProductsList;
