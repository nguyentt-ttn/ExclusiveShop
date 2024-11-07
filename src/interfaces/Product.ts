export interface ProductInterface {
  id: number | string;
  title: string;
  thumbnail?: string;
  price: number;
  category?: string;
  description?: string;
}

// export interface CartItem extends ProductInterface {
//   id?: number | string;
//   userId: string | number;
//   quantity: number;
// }
