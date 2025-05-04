import { Types } from "mongoose";

export interface IOrder {
  user: Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  productDetails: {
    name: string;
    brand: string;
    price: number;
  };
  totalPrice: number;
  status: "Pending" | "Delivered" | "Cancelled";
  transaction?: {
    id?: string;
    transactionStatus?: string;
    bank_status?: string;
    sp_code?: string;
    sp_message?: string;
    method?: string;
    date_time?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
