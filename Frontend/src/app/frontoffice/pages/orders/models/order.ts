export interface Order {
  id?: string;
  status: string;
  shippingMethod: string;
  shippingLocation: string;
  deliveryLocation: string;
  createdDate: string;
  expectedDate: string;
  closedDate: string | null;
  reference: string;
  type: string;
  direction: string;
  domain: string;
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
}
