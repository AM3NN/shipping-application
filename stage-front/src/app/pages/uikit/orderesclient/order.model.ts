import {Product} from "../product/productt.service";

export interface OrderProduct {
    product: Product;
    quantity: number;
}

export interface Order {
    id?: string;

    status?: string;
    shippingMethod: string;
    shippingLocation: string;
    deliveryLocation: string;
    createdDate: Date | string;
    expectedDate: Date | string;
    closedDate?: Date | string | null;
    reference?: string;
    type: string;
    direction: string;
    shippingCost: number;
    shippingCurrency: string;
    discount: number;
    discountCurrency: string;
    netAmount: number;
    netCurrency: string;
    tax: number;
    taxCurrency: string;
    totalAmount: number;
    totalCurrency: string;

    clientId: string;

    products: OrderProduct[];
}
