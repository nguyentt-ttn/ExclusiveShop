/////
import React, { createContext, useEffect, useReducer, useState } from "react";
import { ProductInterface } from "../interfaces/Product";
import cartReducer from "../reducers/cartReducer";
import api from "../axios";
import { CartItem } from "../interfaces/Cart";
import { UserInterface } from "../interfaces/User";

export type CartContextType = {
  state: { products: CartItem[]; order: { items: CartItem[]; user: UserInterface }[] };
  addToCart: (product: ProductInterface) => void;
  removeFromCart: (id: number | string) => void;
  clearCart: () => void;
  placeOrder: () => void;
 
};

export const CartContext = createContext<CartContextType>({} as CartContextType);

type ChildrenProps = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(cartReducer, { products: [], order: [] });
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (user.id) {
      setIsLoggedIn(true);
    }
  }, [user.id]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user.id) return;
      try {
        const { data } = await api.get("/carts", {
          params: { userId: user.id },
        });
        const [cart] = data;
        const products = cart ? cart.items : [];
        dispatch({ type: "SET_CART", payload: products });
      } catch (error) {
        console.error("Failed to fetch cart", error);
      }
    };
    fetchCart();
  }, [user.id]);

  useEffect(() => {
    const saveCart = async () => {
      if (!user.id) return;
      try {
        const { data } = await api.get("/carts", {
          params: { userId: user.id },
        });
        const [cart] = data;
        if (cart) {
          await api.put(`/carts/${cart.id}`, { userId: user.id, items: state.products });
        } else {
          await api.post("/carts", { userId: user.id, items: state.products });
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (state.products.length > 0) {
      saveCart();
    }
  }, [state.products, user.id]);

  const addToCart = (product: ProductInterface) => {
    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.")
      window.location.href= `/login`
      return;
    }
    const existingProductIndex = state.products.findIndex((item) => item.id === product.id);
    if (existingProductIndex >= 0) {
      const updatedProducts = state.products.map((item, index) =>
        index === existingProductIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      dispatch({ type: "SET_CART", payload: updatedProducts });
    } else {
      const cartItem: CartItem = { ...product, quantity: 1 };
      dispatch({ type: "ADD_TO_CART", payload: cartItem });
    }
  };

  const removeFromCart = async (id: number | string) => {
    if (confirm("Bạn có muốn xóa ?")) {
      try {
        const { data } = await api.get("/carts", {
          params: { userId: user.id },
        });
        const [cart] = data;
        if (cart) {
          const updatedProducts = cart.items.filter((item: CartItem) => item.id !== id);
          await api.put(`/carts/${cart.id}`, { userId: user.id, items: updatedProducts });
          dispatch({ type: "SET_CART", payload: updatedProducts });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const clearCart = async () => {
    try {
      const { data } = await api.get("/carts", {
        params: { userId: user.id },
      });
      const [cart] = data;
      if (cart) {
        await api.put(`/carts/${cart.id}`, { userId: user.id, items: [] });
      }
      dispatch({ type: "SET_CART", payload: [] });
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };

  const placeOrder = async () => {
    const orderDetails = {
      user: {
        name: user.name,
        email: user.email,
        address: user.address
      },
      items: state.products,
      
    };
  
    try {
      await api.post('/orders', orderDetails);
      dispatch({ type: 'SET_ORDER', payload: orderDetails });
      await clearCart();
      localStorage.setItem('order', JSON.stringify(orderDetails));
      window.location.href = '/order';
    } catch (error) {
      console.error('Failed to place order', error);
    }
  }

 

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, clearCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
