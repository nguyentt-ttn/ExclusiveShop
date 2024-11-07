///
import { CartItem } from "../interfaces/Cart";
import { UserInterface } from "../interfaces/User";

type CartState = {
  products: CartItem[];
  order: { items: CartItem[]; user: UserInterface } [];
};

type CartAction =
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: number | string }
  | { type: "CLEAR_CART" }
  | { type: "SET_ORDER"; payload: { items: CartItem[]; user: UserInterface } []}
  | { type: "CLEAR_ORDER" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, products: action.payload };
    case "ADD_TO_CART":
      return { ...state, products: [...state.products, action.payload] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        products: state.products.filter(item => item.id !== action.payload)
      };
    case "CLEAR_CART":
      return { ...state, products: [] };
    case "SET_ORDER":
      return { ...state, order: action.payload };
    
    default:
      return state;
  }
};

export default cartReducer;
