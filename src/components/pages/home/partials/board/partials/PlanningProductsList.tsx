import { useState, useEffect, type FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useProductQuery } from "@/api/useProductQuery";
import Loader from "@/components/commons/ui/Loader";
import useProductPlanningStore from "@/store/useProductPlanningStore";
import Input from "@/components/commons/ui/Input";
import DraggableProductCard from "./DraggableProductCard";
import type { Product } from "@/types/product";
import ProductCard from "@/components/commons/ProductCard";
import FiltersTab from "./FiltersTab";
import NoResults from "./NoResults";
import { useDebounce } from "@/hooks/useDebounce";
import clsx from "clsx";

interface PlanningProductsListProps {
  draggable?: boolean;
  filteredProducts?: Product[];
}

const PlanningProductsList: FC<PlanningProductsListProps> = ({
  draggable = false,
  filteredProducts,
}) => {
  const { searchQuery, handleSearchChange, clearSearch } =
    useProductPlanningStore();
  const [debouncedQuery] = useDebounce<string>(searchQuery, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const { data: allProducts, isLoading } = useProductQuery();
  const products = filteredProducts || allProducts || [];
  const filterBySearch = (items: Product[]) => {
    if (!items || items.length === 0) return [];

    if (isSearching || isClearing) return [];

    if (!debouncedQuery) return items;

    return items.filter(
      (product) =>
        product.part.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        product.machine?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        product.stock?.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  };

  const filteredBySearch = filterBySearch(products);

  const showLoader = isLoading || isSearching || isClearing;

  const handleClearSearch = () => {
    setIsClearing(true);
    clearSearch();
    setTimeout(() => {
      setIsClearing(false);
    }, 300);
  };

  useEffect(() => {
    setLocalProducts(filteredBySearch);
  }, [JSON.stringify(filteredBySearch)]);

  useEffect(() => {
    if (debouncedQuery === "") {
      setIsClearing(true);
      setTimeout(() => {
        setIsClearing(false);
      }, 300);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (searchQuery && searchQuery !== debouncedQuery) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery, debouncedQuery]);

  return (
    <Droppable droppableId="PlanningProductsList" direction="vertical">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={clsx(
            "xl:col-span-4 xl:border-r border-r-primary-3/80 xl:pr-2.5 xl:mr-2.5",
            snapshot.isDraggingOver ? "opacity-70" : "opacity-100"
          )}
        >
          <div className="flex flex-col">
            <h3 className="text-lg text-white font-medium">
              Planlanabilir Ürünler
            </h3>

            <FiltersTab />

            <Input
              showMagnifier
              value={searchQuery}
              onChange={handleSearchChange}
              searchQuery={searchQuery}
              clearSearch={handleClearSearch}
              placeholder="Ürün ara..."
            />

            <div className="overflow-y-auto overflow-x-hidden mt-2 h-[210px] xl:h-[calc(100vh-314px)]">
              {showLoader ? (
                <Loader />
              ) : (
                <div className="space-y-2">
                  {localProducts && localProducts.length > 0 ? (
                    localProducts.map((product, index) =>
                      draggable ? (
                        <DraggableProductCard
                          key={product.id}
                          product={product}
                          index={index}
                        />
                      ) : (
                        <div key={product.id}>
                          <ProductCard product={product} />
                        </div>
                      )
                    )
                  ) : (
                    <NoResults />
                  )}
                </div>
              )}
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default PlanningProductsList;
