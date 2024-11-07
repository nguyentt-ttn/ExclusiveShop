import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { ProductInterface } from "../interfaces/Product";
import api from "../axios";
import { ProductContext } from "../contexts/ProductContext";


const productSchema = z.object({
    title: z.string().min(6,"Title tối thiểu 6 ký tự"),
    price: z.number().min(0),
    description: z.string().optional(),
    category: z.string().nonempty("Vui lòng chọn Category")
})

const ProductForm = () => {
  const{onSubmitProduct} = useContext(ProductContext)
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProductInterface>(
    {resolver: zodResolver(productSchema)}
  );
  
    useEffect(()=>{if(id){
        (async()=>{
        const {data} = await api.get(`/products/${id}`)
        reset(data)
      })()
    }
  },[id,reset])
  
  
  return (
    <div>
      
      <form onSubmit={handleSubmit((data)=> onSubmitProduct({...data, id}))}>
        <h1>{id ? "Edit Product" : "Add Product"}</h1>
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
          />
          {errors.title?.message && (
            <p className="text-danger">{errors.title?.message}</p>
          )}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price?.message && (
            <p className="text-danger">{errors.price?.message}</p>
          )}
        </div>
        {/* <div className="form-group mb-3">
          <label htmlFor="category">category</label>
          <input
            type="text"
            className="form-control"
            {...register("category", { required: true })}
          />
          {errors.category?.message && (
            <p className="text-danger">{errors.category?.message}</p>
          )}
        </div> */}
        <div className="form-group mb-3">
          <label htmlFor="category">Category</label>
          <select id="category" className="form-control" {...register("category", { required: true })}>
            <option value="">Select a category</option>
            <option value="Nước hoa">Nước hoa</option>
            <option value="Đồ gia dụng">Đồ gia dụng</option>
            <option value="Đồ điện tử">Đồ điện tử</option>
            <option value="Thức ăn">Thức ăn</option>
            <option value="Quần áo">Quần áo</option>
          </select>
          {errors.category?.message && ( <p className="text-danger">{errors.category?.message}</p> )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            {...register("description", { required: true })}
          />
          {errors.description?.message && (
            <p className="text-danger">{errors.description?.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Edit Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
