import { useEffect, useState } from "react";
import { CartItem } from "../interfaces/Cart";
import { UserInterface } from "../interfaces/User";
import { Link } from "react-router-dom";
import qrImage from "../imgs/maqr.jpg";

const OrderPage = () => {
  const [order, setOrder] = useState<{
    items: CartItem[];
    user: UserInterface;
  } | null>(null);

  useEffect(() => {
    const orderFromStorage = localStorage.getItem("order");
    if (orderFromStorage) {
      setOrder(JSON.parse(orderFromStorage));
    }
  }, []);

  if (!order) {
    return (
      <div className="text-danger fs-2 m-3">Không có đơn hàng nào!!</div>
    );
  }
  const { items, user } = order;
  const totalPrice = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div>
      
      <div className="container shadow mb-3 mt-3">
        <div className="row ">
          <div className="col-12">
            <h1 className="text-center">THANK YOU!</h1>
            <p className="text-center">
              We received your order and will start preparing your package right
              away. You will receive a confirmation email in a moment.{" "}
            </p>
          </div>
        </div>
        <div className="row order-details ">
          <div className="col-md-7 p-2">
            <div className="product-item-order">
              <table className="table table-bordered table-striped ">
                <thead>
                  <th>Mã Sp</th>
                  <th>Title</th>
                  <th>Thumbnail</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </thead>
                {items.map((item) => (
                  <tbody key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>
                      <img src={item.thumbnail} height={150} alt="" />
                    </td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price.toFixed(2)}$</td>
                  </tbody>
                ))}
              </table>
            </div>
            <div className=" order-details ">
              <div className="order-summary pl-4 pr-4 ">
                <table className=" ">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td></td>
                      <td></td>
                      <td>{totalPrice}$</td>
                    </tr>

                    <tr className="total">
                      <td>Total</td>
                      <td></td>
                      <td></td>
                      <td>{totalPrice}$</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-5 shadow pt-2 pl-4 ">
            <h2>Delivery Details</h2>
            <p>Name: {user.name}</p>
            <p>Address: {user.address}</p>
            <p>Email: {user.email}</p>
            <p>Number Phone: 0985125849</p>
            <div className="">
              <h2>Payment method</h2>
              <p>Mã QR</p>
              <p>
                <img src={qrImage} width={260} alt="" />
              </p>
            </div>
            <Link to="/">
              <button className="btn btn-primary mt-2 mb-3">KEEP SHOPPING</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
