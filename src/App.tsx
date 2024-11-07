
import "./App.css";
import { Navigate, Route, Routes  } from "react-router-dom";
import Home from "./pages/Home";
import ProductForm from "./pages/ProductForm";
import ClientLayout from "./components/ClientLayout";
import AdminLayout from "./components/AdminLayout";
import DashBoard from "./pages/admin/DashBoard";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import AuthForm from "./pages/AuthForm";
import OrderPage from "./pages/Oder";
import UserList from "./pages/admin/User";




function App() {
  JSON.parse(localStorage.getItem("user") || "{}");


  return (
    <>
     
          <Routes>
          {/* client */}
          <Route path="/"  element={<ClientLayout/>}>
          <Route path="/" element={<Navigate to="/"/>}/>
            <Route path="/" index element={<Home />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} /> 
            <Route path="/login" element={<AuthForm isLogin={true} />} />
            <Route path="/register" element={<AuthForm isLogin={false} />} />
            <Route path="/products-list" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<OrderPage />} />
         </Route>
            
          {/* admin */}
          
            <Route path="/admin" element={<AdminLayout/>} >
              <Route index element={<DashBoard />}/>
              <Route path="/admin/product-edit/:id" element={<ProductForm />} />
              <Route path="/admin/product-add" element={<ProductForm />} />
              <Route path="/admin/user-list" element={<UserList />} />
            </Route >
        
          
          <Route path="*" element={<NotFound />} />

          </Routes>
        
     
    </>
  );
}

export default App;
