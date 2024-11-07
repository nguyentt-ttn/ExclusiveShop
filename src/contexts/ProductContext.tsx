import { createContext, useEffect, useReducer } from "react"
import { ProductInterface } from "../interfaces/Product"

import api from "../axios"
import productReducer from "../reducers/productReducer"

type ProductContextType = {
    state:{
      products:ProductInterface[];
      selectedProduct?: ProductInterface;
      setsearchProduct: ProductInterface[]
    } 
    handleRemove:(id:number|string)=>void;
    onSubmitProduct: (data:ProductInterface)=>void;
    getDetail: (data:number|string)=>Promise<ProductInterface>
    searchProducts: (query: string) => void
    
  }
export const ProductContext = createContext<ProductContextType>({} as ProductContextType)
type ChildrenProps = {
    children: React.ReactNode
}

export const ProductProvider = ({children}: ChildrenProps) =>{
  const [state, dispatch] = useReducer(productReducer,{products:[], setsearchProduct: []});
  
  useEffect(() => {
    (async () => {
      const { data } = await api.get("/products");
     
      dispatch({ type: "SET_SEARCH_PRODUCTS", payload: data }); 
      dispatch({type: "SET_PRODUCTS", payload:data});
    })();
  }, []);

  const onSubmitProduct = async (data: ProductInterface) => {
    try {
      if(data.id){
        //edit
        await api.patch(`/products/${data.id}`, data);
        dispatch({type: "UPDATE_PRODUCT", payload:data})
      }else{
        //add
        await api.post("/products", data);
        dispatch({type: "ADD_PRODUCT", payload:data})
      }
      window.location.href = "/admin";
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (id: number|string) => {
    if (confirm("Bạn có muốn xóa ?")) {
      await api.delete(`/products/${id}`);
      dispatch({type:"REMOVE_PRODUCT" , payload:id})
    }
  };
  useEffect(()=>{
    
  },[])
  
const searchProducts = (query: string) => {
  const filteredProducts = state.setsearchProduct.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
  );
  dispatch({ type: "SET_PRODUCTS", payload: filteredProducts });
}


  const getDetail = async (id: number | string) => {
		const { data } = await api.get(`/products/${id}`);
		dispatch({ type: "SET_SELECTED_PRODUCT", payload: data });
    return data
	};

return(
    <ProductContext.Provider value={{state,handleRemove,onSubmitProduct,getDetail,searchProducts}}>{children}</ProductContext.Provider>
)
}