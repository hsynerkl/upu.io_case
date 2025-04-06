import { Draggable } from "react-beautiful-dnd";
import ProductCard from "@/components/commons/ProductCard";
import type { Product } from "@/types/product";
import type { FC } from "react";
import clsx from "clsx";

interface DraggableProductCardProps {
  product: Product;
  index: number;
}

const DraggableProductCard: FC<DraggableProductCardProps> = ({
  product,
  index,
}) => {
  return (
    <Draggable draggableId={product.id.toString()} index={index}>
      {(provided, snapshot) => {
        const style = {
          ...provided.draggableProps.style,
          zIndex: snapshot.isDragging ? 999 : "auto",
          transform: snapshot.isDragging
            ? provided.draggableProps.style?.transform
            : "none",
        };

        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={clsx(
              "w-full max-w-full mb-2 transition-all duration-200",
              snapshot.isDragging ? "opacity-70 shadow-lg" : "opacity-100"
            )}
            style={style}
          >
            <ProductCard product={product} />
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableProductCard;
