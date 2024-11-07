import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../interfaces/User";
import api from "../axios";


export type AuthContextType = {
	user: UserInterface | null;
	onSubmit:(user:UserInterface, isLogin?: boolean)=>void;
	handleLogout: () => void;
};
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
 const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserInterface|null>(null)
    
	const nav = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
          setUser(JSON.parse(user));
        }
      }, []);

	const onSubmit = async(user:UserInterface, isLogin?:boolean)=>{
		try {
            if(isLogin){
                const {data} = await api.post("/login" , user)
                localStorage.setItem("accessToken", data.accessToken)
                localStorage.setItem("user", JSON.stringify(data.user))
                setUser(data.user)
                if(confirm("Login successfully")){
                    nav("/")
                    window.location.reload()
                }
            }else{
                const userRole = { ...user, role: "member" };
                await api.post("/register", userRole);
                console.log(userRole)
                if(confirm("Register successfully")){
                  nav("/login")
                }
            }
        } catch (error) {
			console.log(error)
            alert(error.response.data)
        }
	}

    

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("user");
		localStorage.removeItem("order");
		setUser(null);
     
		nav("/login");
        window.location.reload()

	};
	return <AuthContext.Provider value={{ user,onSubmit, handleLogout }}>{children}</AuthContext.Provider>;
};
export default AuthProvider
