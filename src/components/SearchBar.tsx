
import React, { useContext, useState } from 'react';
import { ProductContext } from '../contexts/ProductContext';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const { searchProducts } = useContext(ProductContext);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearchClick = (event: React.FormEvent) => {
        event.preventDefault();
        searchProducts(query);
    };

    return (
        <form className='form-inline' onSubmit={handleSearchClick}>
            <input
                className="form-control  mr-sm-2"
                value={query}
                type="text"
                placeholder="Tìm kiếm sản phẩm?"
                onChange={handleInputChange}
            />
            <button className="btn btn-outline-dark my-1 my-sm-0" type="submit">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
