import { useContext, useEffect } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";


const ProductDetail = () => {
  const { state, getDetail } = useContext(ProductContext);
  const { id } = useParams();
   useEffect(() => {if (id) {
   
      getDetail(id); }
    }, [id,getDetail]);
 
    const { addToCart } = useContext(CartContext);
  
  return (
    <div>
      

<div className="container">
    <div className="row justify-content-center ">
      {state.selectedProduct && (
        <div className="col-md-10 ">
            <div className="product-card-detail ">
                <img src={state.selectedProduct.thumbnail} alt="Product Image" className="img-fluid"/>
                <div className="product-info mt-3">
                    <h6 className="text-uppercase text-muted">EXCLUSIVE </h6>
                    <h2>{state.selectedProduct.title}</h2>
                    <p className="product-price">{state.selectedProduct.price}</p>
                    <p>{state.selectedProduct.description}</p>
                    <dl className="product-details">
                        <dt>Fit:</dt>
                        <dd>Perfect</dd>
                        <dt>Length:</dt>
                        <dd>Runs long</dd>
                        <dt>Comfort:</dt>
                        <dd>Comfortable</dd>
                        <dt>Quality:</dt>
                        <dd>Regular</dd>
                    </dl>
                    <div className="d-flex justify-content-between align-items-center">
                            <button className="btn btn-primary mb-3" onClick={()=>addToCart(state.selectedProduct)} >Mua hàng</button>
                    </div>
                </div>
            </div>
        </div>
      )}
        
    </div>
</div>
      </div>
  );
};

export default ProductDetail;
