import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import logoE from '../imgs/Exclusive-designstyle-exclusive-m.png'

const Header = () => {
  const { user, handleLogout } = useContext(AuthContext);
  
  const { state ,clearCart} = useContext(CartContext);
	const [total, setTotal] = useState(0);
	console.log(state.products);
	useEffect(() => {
		const total = state.products.reduce((acc, item) => acc + item.quantity, 0);
		setTotal(total);
	}, [state.products]);

 const handleLogoutWeb=()=>{
  clearCart()
  handleLogout()
 }
  return (
    <div>
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container ">
          <Link to="/" className="navbar-brand">
          <img src={logoE} width={135} alt="" />
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item"><Link to="/" className="nav-link fs-5">Home</Link></li>
              <li className="nav-item"><Link to="/products-list" className="nav-link fs-5 ">Products</Link></li>
              <li className="nav-item "><Link to="/admin" className="nav-link fs-5 ">Admin</Link></li>
              <li className="nav-item "><Link to="/cart" className="nav-link fs-5 ">Cart{total}</Link></li>
              
              
              {user?(
                <>
                <li className="nav-item "><Link to="/order" className="nav-link fs-5 ">Order</Link></li>
                <li className="nav-item"><button className="btn btn-danger" onClick={handleLogoutWeb}>Hello, {user?.name}-Logout</button></li>
                </>
              ):(
                <>
                <li className="nav-item"><Link to="/register" className="nav-link fs-5">Register</Link></li>
                <li className="nav-item"><Link to="/login" className="nav-link fs-5">Login</Link></li>
                </>
              )}
            </ul>
            <SearchBar />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
