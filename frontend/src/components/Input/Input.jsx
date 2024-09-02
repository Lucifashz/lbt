import React from "react";

export default function Input(props) {
   return (
      <div>
         <div className="relative z-0" >
            <input type={props.type} id={props.name} className={`block px-2.5 pb-2.5 pt-4 w-full text-sm ${props.message ? "border-danger" : "border-gray-300"} bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder=" " name={props.name} onChange={props.handleChange} value={props.inputValue} required/>
            <label htmlFor={props.name} className={`absolute text-sm ${props.message ? "text-danger" : "text-gray-500"} duration-300 transform -translate-y-4 scale-75 top-2 ${props.inputValue ? "z-10" : "-z-10"} origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:z-10 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>{props.text}</label>
            {props.children}
         </div>
         {props.message ? <p id="outlined_success_help" className="ml-2 text-xs text-danger">{props.message}</p> : ""}
      </div>
   )
}
