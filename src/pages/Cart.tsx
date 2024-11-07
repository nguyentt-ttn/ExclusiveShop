import  { useContext, useState } from 'react';
import qrImage from '../imgs/maqr.jpg';
import { CartContext } from '../contexts/CartContext';
import { CartItem } from '../interfaces/Cart';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const Cart  = () => {
  const { state, removeFromCart,placeOrder,clearCart } = useContext(CartContext);
  const [showQRCode, setShowQRCode] = useState(false);
  const nav = useNavigate()

  const handleCheckout = () => {
    setShowQRCode(true);
    alert("Xin vui lòng chuyển khoản theo mã QR.");
  };

//   const handlePaymentConfirmation = () => {
//     setShowQRCode(false);
//   };
  const handlePlaceOrder = () => {
    clearCart()
    placeOrder()
    nav('/order')
  };
  const calculateTotalPrice = () => {
    return state.products.reduce((total, product) => total + product.price * product.quantity, 0);
  };


  return (
    <>
    <div className="py-5 section">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h4 className="mb-4">1. My Bag</h4>
                    {state.products.length === 0 ? ( <p className='text-muted fw-bolder fs-4'>Không có sản phẩm nào trong giỏ hàng của bạn!</p> ) : (state.products.map((product: CartItem)  => (

                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-md-2">
                                    <img src={product.thumbnail} alt="Product Image" className="img-fluid"/>
                                </div>
                                <div className="col-md-8">
                                    <h6 className="card-title">{product.title}</h6>
                                    <div className="quantity mt-2">
                                        <button className="btn btn-sm btn-outline-secondary" >-</button>
                                        <span className="mx-2">{product.quantity}</span>
                                        <button className="btn btn-sm btn-outline-secondary" >+</button>
                                    </div>
                                </div>
                                <div className="col-md-2 text-right">
                                    <p className="card-text ">{product.price}$</p>
                                    <button  onClick={() => removeFromCart(product.id)} className="text-muted btn btn-"> <FontAwesomeIcon icon={faTrash} className='icon-link-hover' /></button>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                      )))}
                    <div className="row">
                        <div className="col-md-12 text-right">
                        Total: <span className="card-text text-danger">{state.products.reduce(
            (total, product) => total + product.price * product.quantity,
            0
          )}$</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center mt-3">
                          <Link to="/">
                            <button className="btn btn-outline-dark">Back to Shopping</button></Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4 className="mb-4">2. Delivery</h4>
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Order summery</h6>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Subtotal: <span className="float-right">${calculateTotalPrice()}</span></li>
                               
                                <li className="list-group-item">Total: <span className="float-right">${calculateTotalPrice()}</span></li>
                            </ul>
                            <p className="card-text mt-3">Estimated shipping time: 2 days</p>
                            <button onClick={handleCheckout} className="btn btn-dark btn-block mt-3">Check Out</button>
                        </div>
                    </div>
                    
                    {showQRCode && (
                         <><h4 className="mb-4 mt-5">Hình thức thanh toán</h4>
                            <div className="card">
                                <div className="card-body justify-content-between">
                                 <div className="qr-container">
                                 <img src={qrImage} width={300} alt="QR Code" />
                                  <button onClick={handlePlaceOrder} className="btn btn-danger mt-2 w-100">Đã thanh toán</button> </div>
                                </div>
                            </div>
                         </> )}
                </div>
            </div>
        </div>
    </div>

    
    
    </>
  );
};

export default Cart;
