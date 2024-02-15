import { DeliveryState, OrderState, PaymentState } from "@prisma/client";
import { Address, CustomerInformation } from "./customer";
import { User } from "./user";

export enum DeliveryStateUI {
  IN_PROGRESS = "In Bearbeitung",
  SHIPPED = "Versendet",
  DELIVERED = "Geliefert",
}

export enum PaymentStateUI {
  PENDING = "Warte auf Zahlung",
  PAYED = "Bezahlt",
  FAILED = "Fehlgeschlagen",
}

export enum OrderStateUI {
  IN_PROGRESS = "In Bearbeitung",
  CANCELED = "Storniert",
  COMPLETED = "Abgeschlossen",
}

export interface OrderProduct {
  id: number;
  qty: number;
  price?: number;
  title?: string;
  subtitle?: string;
}

export interface PaymentData {
  deliveryAddress: Address;
  customerInformation?: CustomerInformation;
  products: OrderProduct[];
}

export interface Order {
  id: number;
  created: Date;
  deliveryAddress: Address;
  products: OrderProduct[];
  paymentState: PaymentState;
  orderState: OrderState;
  deliveryState: DeliveryState;
  customerInformation?: CustomerInformation;
  user?: User;
}
