import { createContext, useEffect, useReducer } from "react"
import api from "../axios"
import { UserInterface } from "../interfaces/User"
import userReducer from './../reducers/userReducer';

type UserContextType = {
    state:{
      users:UserInterface[];
    } 
  }
export const UserContext = createContext<UserContextType>({} as UserContextType)
type ChildrenProps = {
    children: React.ReactNode
}
export const UserProvider = ({children}: ChildrenProps) =>{
  const [state, dispatch] = useReducer(userReducer,{users:[]});
  
  useEffect(() => {
    (async () => {
      const { data } = await api.get("/users");
      dispatch({type: "SET_USERS", payload:data});
    })();
  }, []);
return(
    <UserContext.Provider value={{state}}>{children}</UserContext.Provider>
)
}