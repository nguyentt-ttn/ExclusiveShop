import React, { useContext, useState } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import SearchBar from '../components/SearchBar';
import ReactPaginate from 'react-paginate';
import { ProductInterface } from '../interfaces/Product';
import styles from './ProductList.module.css';
const ProductList: React.FC = () => {
  const { state } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [sortOption, setSortOption] = useState<string>('');
  const productsPerPage = 4;

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const sortProducts = (products: ProductInterface[]) => {
    switch (sortOption) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price);
      case 'title-asc':
        return products.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return products.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts([...state.products]);
  const currentProducts = sortedProducts.slice( currentPage * productsPerPage, (currentPage + 1) * productsPerPage );

  return (
    <div>
      <div className="container my-2">
        <div className="filter-sort-bar mb-3">
          <div className="d-flex align-items-center">
            <div className="icon-buttons">
              {/* Add any icons/buttons you need here */}
            </div>
            <div className='sapxepform'>
            <select onChange={handleSortChange} value={sortOption}>
              <option value="">Mặc định</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="title-asc">Tên A-Z</option>
              <option value="title-desc">Tên Z-A</option>
            </select>
          </div>
          </div>
          <SearchBar />
        </div>
        <div className="d-flex justify-content-between mb-3">
          <h2>Danh sách sản phẩm</h2>
          
        </div>
        <div className="row">
          {currentProducts.map((item) => (
            <div className="col-md-3 product-card" key={item.id}>
              <div className="card">
                <Link to={`/product-detail/${item.id}`}>
                  <img src={item.thumbnail} alt={item.title} />
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
                  <button className="btn btn-primary w-100" onClick={() => addToCart(item)}>Add to cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={Math.ceil(state.products.length / productsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default ProductList;
