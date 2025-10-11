import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
          value={value}
          className="w-full bg-transparent outline-none"
        />

        {type === "password" && ( showPassword?


            (
            <FaRegEye size={22} onClick={() =>toggleShowPassword()} className="text-primary cursor-pointer"/> 
    
            ):(
            <FaRegEyeSlash size={22} onClick={()=>toggleShowPassword()} className="text-slate-400 cursor-pointer"/>
            ))}
      </div>
    </div>
  );
};
export default Input;
