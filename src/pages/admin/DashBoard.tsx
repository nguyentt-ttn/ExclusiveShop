import  { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';



const DashBoard = () => {
  const {state,handleRemove} = useContext(ProductContext)
  return (
    <div className='mt-2'>
      <Link to="/admin/product-add">
        <button className="btn btn-success">Add Product</button>
      </Link>
      <table className="table table-bordered table-striped container w-100">
          <thead className="table-dark ">
            <tr >
              <th>id</th>
              <th>Title</th>
              <th>Image</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
              <th className="action text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {state.products.map((item) => (
              <tr>
                <td className='text-center'>{item.id}</td>
                <td>{item.title}</td>
                <td><img src={item.thumbnail} width={150} alt="" /></td>
                <td className='text-danger fw-bold'>{item.price}$</td>
                <td className='fst-italic'>{item.category}</td>
                <td className='fst-italic'>{item.description}</td>
                <td>
                  <Link to={`/admin/product-edit/${item.id}`}>
                  <button className="btn btn-primary" >Update</button> </Link>
                  <button className="btn btn-danger" onClick={()=>handleRemove(item.id!)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default DashBoard