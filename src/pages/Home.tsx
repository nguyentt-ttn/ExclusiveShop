import { useContext, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Slideshow from "../components/Slideshow";
import { Link } from "react-router-dom";
import { CartContext,  } from "../contexts/CartContext";
import ReactPaginate from "react-paginate";




const Home = () => {

  const { state } = useContext(ProductContext);

  const { addToCart } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(0)
  const productsPerPage = 8
  const handlePageClick = (data: { selected: number }) => {setCurrentPage(data.selected)}
  const currentProducts = state.products.slice(currentPage * productsPerPage,(currentPage + 1) * productsPerPage)
  return (
    <div>
       <Slideshow/>
      <div className="container my-5">
        <h2>Today's Flash Sales</h2>
        <div
          id="flashSalesCarousel"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row">
                {currentProducts.map((item) => (
                <div className="col-md-3 product-card" key={item.id}>
                    <div className="card ">
                    <Link to={`/product-detail/${item.id}`}>
                    <img src={item.thumbnail} />
                    </Link>
                      <div className="card-body">
                      <Link to={`/product-detail/${item.id}`}>
                        <h5 className="card-title">{item.title}</h5> 
                      </Link>
                        <p className="card-text">
                          ${item.price} <del>$400</del>
                        </p>
                        <p className="card-text">
                          <small className="text-muted">★★★★★ (99)</small>
                        </p>
                        <button className=" btn btn-primary w-100" onClick={()=>addToCart(item)}>Add to cart</button>
                      </div>
                    </div>
                </div> 
              ))}
              </div>
            </div>
          </div>

          <a
            className="carousel-control-prev"
            href="#flashSalesCarousel"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#flashSalesCarousel"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        <div className="text-center mt-3">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={Math.ceil(state.products.length / productsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
        </div>
      </div>
    </div>
  )
};

export default Home;
