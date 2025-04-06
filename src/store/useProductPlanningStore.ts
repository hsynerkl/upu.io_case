import { create } from "zustand";
import toast from "react-hot-toast";
import { filters } from "@/constants";
import type { ChangeEvent } from "react";
import type { Product } from "@/types/product";

interface ProductPlanningState {
  activeTab: string;
  searchQuery: string;
  selectedProductId: number | null;
  activeDetailPanel: string | null;
  selectedFilter: string;

  plannedProducts: Product[];
  isDragging: boolean;

  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  selectProduct: (id: number | null) => void;
  setActiveDetailPanel: (panelId: string | null) => void;
  setSelectedFilter: (filter: string) => void;
  resetStore: () => void;

  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  clearSearch: () => void;

  addToPlannedProducts: (product: Product) => void;
  setIsDragging: (isDragging: boolean) => void;
}

const initialFilter = filters[0].id;

const useProductPlanningStore = create<ProductPlanningState>((set) => ({
  activeTab: "all",
  searchQuery: "",
  selectedProductId: null,
  activeDetailPanel: null,
  selectedFilter: initialFilter,

  plannedProducts: [],
  isDragging: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectProduct: (id) => set({ selectedProductId: id }),
  setActiveDetailPanel: (panelId) => set({ activeDetailPanel: panelId }),
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),

  resetStore: () =>
    set({
      activeTab: "all",
      searchQuery: "",
      selectedProductId: null,
      activeDetailPanel: null,
      selectedFilter: initialFilter,
      plannedProducts: [],
      isDragging: false,
    }),

  handleSearchChange: (e) => set({ searchQuery: e.target.value }),
  handleFilterChange: (e) => set({ selectedFilter: e.target.value }),
  clearSearch: () => set({ searchQuery: "" }),

  addToPlannedProducts: (product) =>
    set((state) => {
      toast.success(`${product.machine} planlandı`);

      return {
        plannedProducts: [...state.plannedProducts, product],
      };
    }),

  setIsDragging: (isDragging) => set({ isDragging }),
}));

export default useProductPlanningStore;
