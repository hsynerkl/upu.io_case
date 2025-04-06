export interface Product {
  id: number;
  machine: string;
  machineType: string;
  part: string;
  stock: string;
  opCode: string;
  isPlanned: boolean;
  isActive: boolean;
  type: "Planned" | "Unplanned";
  category: string;
  remainingWork: number;
  plannedQuantity: number;
  unplannedQuantity: number;
  activeTaskTime: string | null;
}
