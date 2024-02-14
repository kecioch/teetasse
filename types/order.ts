import { Address, CustomerInformation } from "./customer";

export interface OrderProduct {
  id: number;
  qty: number;
  price?: number;
}

export interface PaymentData {
  deliveryAddress: Address;
  customerInformation?: CustomerInformation;
  products: OrderProduct[];
}
