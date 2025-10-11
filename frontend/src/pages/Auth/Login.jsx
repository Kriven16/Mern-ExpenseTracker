import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import Input from "../../components/lnputs/Input.jsx";
import { validateEmail } from "../../utils/helper.js";
import SignUp from "./SignUp.jsx";
import { API_PATHS } from "../../utils/apiPath.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { UserContext } from "../../context/UserContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext) 

  const navigate = useNavigate();

  //handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return setError("Please enter a vaild email address");
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    if (password.length < 8) {
      setError("Password is too short");
      return;
    }

    


    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,password
      })
      
      const {token ,user} = response.data
      if(token){
        localStorage.setItem("token",token)
        updateUser(user)
        navigate("/dashboard")
      }
      
    } catch (error) {

      if(error.response && error.response.data.message){
        setError(error.response.data.message)
        
      }else{
        setError("Something went wrong. Please try again")
      }
      
    }

  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-1 mb-6">
          Please enter you details to login
        </p>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="john@gmail.com"
            type="text"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            LOGIN
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account ?{" "}
            <Link to='/signup' className="font-medium text-primary underline">SignUp</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
