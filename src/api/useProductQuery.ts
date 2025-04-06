import { useQuery } from "@tanstack/react-query";
import useProductPlanningStore from "../store/useProductPlanningStore";
import { useDebounce } from "@/hooks/useDebounce";
import type { Product } from "@/types/product";
import { products, tabs, filters } from "@/constants";

export const useProductQuery = () => {
  const { activeTab, searchQuery, selectedFilter } = useProductPlanningStore();
  const debouncedQuery = useDebounce<string>(searchQuery, 500)[0];

  return useQuery<Product[]>({
    queryKey: ["products", activeTab, selectedFilter, debouncedQuery],
    queryFn: () => {
      return new Promise<Product[]>((resolve) => {
        setTimeout(() => {
          let filteredProducts = [...products] as Product[];

          if (activeTab !== "all") {
            const selectedTab = tabs.find((tab) => tab.id === activeTab);
            if (selectedTab) {
              filteredProducts = filteredProducts.filter(
                (product) => product.machineType === selectedTab.label
              );
            }
          }

          if (selectedFilter !== "all") {
            const selectedfilters = filters.find(
              (filter) => filter.id === selectedFilter
            );
            if (selectedfilters) {
              if (selectedFilter === "products") {
                filteredProducts = filteredProducts.filter(
                  (product) =>
                    product.category === "Planlanabilir Urunler" &&
                    !product.isPlanned
                );
              } else if (selectedFilter === "flexible-products") {
                filteredProducts = filteredProducts.filter(
                  (product) => product.category === "Esnek Urunler"
                );
              }
            }
          }

          if (debouncedQuery) {
            const query = debouncedQuery.toLowerCase();
            filteredProducts = filteredProducts.filter(
              (product) =>
                product.machine.toLowerCase().includes(query) ||
                product.part.toLowerCase().includes(query) ||
                product.stock.toLowerCase().includes(query)
            );
          }

          resolve(filteredProducts);
        }, 300);
      });
    },
    staleTime: 5 * 60 * 1000,
  });
};
