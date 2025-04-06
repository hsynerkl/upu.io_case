import { useState, useEffect, type FC } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";
import type { DesignType } from "../../types";
import { useProductQuery } from "@/api/useProductQuery";
import useProductPlanningStore from "@/store/useProductPlanningStore";
import type { Product } from "@/types/product";
import PlanningModal from "./partials/PlanningModal";
import PlannedProductsList from "./partials/PlannedProductsList";
import PlanningProductsList from "./partials/PlanningProductsList";

const Board: FC<{ design: DesignType }> = ({ design }) => {
  const { plannedProducts, addToPlannedProducts, setIsDragging } =
    useProductPlanningStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState<Product | null>(null);
  const [planningProducts, setPlanningProducts] = useState<Product[]>([]);

  const { data: products } = useProductQuery();

  const onDragEnd = (result: DropResult) => {
    setIsDragging(false);

    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (
      source.droppableId === "PlanningProductsList" &&
      destination.droppableId === "PlanningProductsList"
    ) {
      const reorderedItems = Array.from(planningProducts);
      const [movedItem] = reorderedItems.splice(source.index, 1);
      reorderedItems.splice(destination.index, 0, movedItem);

      setPlanningProducts(reorderedItems);
      return;
    }

    if (
      source.droppableId === "plannedProductsList" &&
      destination.droppableId === "plannedProductsList"
    ) {
      const newItems = Array.from(plannedProducts);
      const [movedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, movedItem);

      useProductPlanningStore.setState({ plannedProducts: newItems });
      return;
    }

    if (
      source.droppableId === "PlanningProductsList" &&
      destination.droppableId === "plannedProductsList"
    ) {
      const productId = parseInt(draggableId);
      const product = products?.find((p) => p.id === productId);

      if (product) {
        const isAlreadyPlanned = plannedProducts.some(
          (item) => item.id === product.id
        );

        if (!isAlreadyPlanned) {
          setDraggedItem(product);
          setIsModalOpen(true);
        }
      }
      return;
    }
  };

  const onDragStart = () => {
    setIsDragging(true);
  };

  const handlePlan = () => {
    if (draggedItem) {
      addToPlannedProducts(draggedItem);
    }
    setIsModalOpen(false);
    setDraggedItem(null);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setDraggedItem(null);
  };

  useEffect(() => {
    if (products) {
      const filteredProducts = products.filter(
        (product) => !plannedProducts.some((item) => item.id === product.id)
      );
      setPlanningProducts(filteredProducts);
    }
  }, [products, plannedProducts]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <div className="mt-4 xl:h-[calc(100vh-155px)] select-none bg-primary-6 py-4 px-4 rounded-md container-shadow overflow-hidden gap-4 grid xl:grid-cols-12">
          <PlanningProductsList
            draggable={true}
            filteredProducts={planningProducts}
          />

          <PlannedProductsList
            design={design}
            plannedProducts={plannedProducts}
          />
        </div>
      </DragDropContext>

      <PlanningModal
        isOpen={isModalOpen}
        onClose={handleCancelModal}
        product={draggedItem}
        onPlan={handlePlan}
      />
    </>
  );
};

export default Board;
