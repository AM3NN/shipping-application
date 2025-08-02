import {Warehouse} from "../warehouse/warehouse.service";
import {Product} from "./productt.service";

export interface Inventory {
    id: string;
     name: string;
    reference: string;
    reservedQuantity: number;
    availableQuantity: number;
    warehouseId: string;
    productId?: string;
}
export interface InventoryWithWarehouseDTO {
    id: string;
    inventory: Inventory;
    warehouse: Warehouse;
}
export interface InventoryWithProductDTO {
    id: string;
    inventory: Inventory;
    product: Product;
}
