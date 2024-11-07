import { ProductInterface } from "../interfaces/Product";

type State = {
  products: ProductInterface[];
  selectedProduct?: ProductInterface;
  setsearchProduct: ProductInterface[];
};
type Action =
  | { type: "SET_PRODUCTS"; payload: ProductInterface[] }
  | { type: "ADD_PRODUCT"; payload: ProductInterface }
  | { type: "REMOVE_PRODUCT"; payload: number | string }
  | { type: "UPDATE_PRODUCT"; payload: ProductInterface }
  | { type: "SET_SELECTED_PRODUCT"; payload: ProductInterface | undefined }
  | { type: "SET_SEARCH_PRODUCTS"; payload: ProductInterface[] };

const productReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "SET_SEARCH_PRODUCTS":
      return {
        ...state,
        setsearchProduct: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };

    case "SET_SELECTED_PRODUCT":
      return {
        ...state,
        selectedProduct: state.products.find(
          (item) => item.id === action.payload.id
        ),
      };

    default:
      return state;
  }
};

export default productReducer;
