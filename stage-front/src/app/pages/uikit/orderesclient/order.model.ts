import {Product} from "../product/productt.service";

export interface OrderProduct {
    product: Product;
    quantity: number;
}
export interface OrderDetail {
    id?: string;
    bindingType: string;
    partStatus: string;
    securityLabel: boolean; // reste String
    shrinkwrap: boolean;   // changer String → boolean
    threeHoleDrill: boolean; // idem
    perf: boolean; // "0" or "1"
    productionPage: number;
    thickness: number;
    height: number;
    width: number;
    weight: number;
    textPaperType: string;
    coverFinishType: string;
    textColor: string;
    siren: string;
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
    customproductsids: string[];
}
export interface OrderWithDetailsRequest {
    order: Order;
    customproducts: OrderDetail[];
}
