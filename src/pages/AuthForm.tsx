import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { UserInterface } from "../interfaces/User";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


const userSChema = z.object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6,"Password tối thiểu 6 ký tự"),
    name: z.string().min(3,"Name tối thiếu 3 ký tự").max(25).optional(),
    address: z.string().min(3).max(50).optional()
   
})
type Props = {
    isLogin: boolean
}
const AuthForm = ({isLogin}:Props) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm<UserInterface>(
    {resolver: zodResolver(userSChema)}
  );
  
    const {onSubmit} = useContext(AuthContext)
  
  
  return (
    
      <div className="formdk">
      <div className="signup-container mt-3 mb-3">
        <div className="signup-form">
           <form onSubmit={handleSubmit((user)=>onSubmit(user,isLogin))}> 
            <h2>{isLogin?"Welcome Back":"Get Started Now"}</h2>
            {!isLogin && (
              <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your name"  {...register("name", { required: true })} />
                    {errors.name?.message && (<p className="text-danger">{errors.name?.message}</p>)}
              </div>
            )}
            
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email"  {...register("email", { required: true })} />
                    {errors.email?.message && (<p className="text-danger">{errors.email?.message}</p>)}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your password" {...register("password", { required: true })}/>
                    {errors.password?.message && (
            <p className="text-danger">{errors.password?.message}</p>
          )}
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="terms"/>
                    <label className="form-check-label" htmlFor="terms">Tôi đồng ý với các điều khoản <a href="#">terms & policy</a></label>
                </div>
                <button type="submit" className="btn btn-signup btn-block">{isLogin?"Login":"Register"}</button>
            </form>
            {/* <div className="social-login">
                Google<p>or</p>Apple
            </div> */}
            {isLogin?(
              <div className="signin-link">
                <p>Don't have an account?<Link to="/register">Register</Link></p>
            </div>
            ):(
            <div className="signin-link">
                <p>Have an account?<Link to="/login"> Login</Link></p>
            </div>
            )}
            
        </div>
        <div className="signup-image"></div>
    </div>
    </div>
  );
};

export default AuthForm;
