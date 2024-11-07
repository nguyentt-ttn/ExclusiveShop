import { ProductInterface } from "./Product"

export interface CartItem extends ProductInterface {
  quantity: number;
}

export interface CartState {
  products: CartItem[];
}