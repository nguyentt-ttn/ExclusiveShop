import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext.tsx";
import { ProductProvider } from "./contexts/ProductContext.tsx";
import CartProvider from "./contexts/CartContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
