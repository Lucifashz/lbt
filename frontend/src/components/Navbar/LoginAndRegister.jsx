import React from "react";
import { Link } from "react-router-dom";
import { NavbarItem } from "@nextui-org/react";


export default function LoginAndRegister() {
   return (
      <>
         <NavbarItem className="lg:flex text-sm">
            <Link to="/login" className="py-2.5 px-5 text-sm font-medium rounded-lg border border-cyan-950 bg-white text-cyan-950 shadow-sm hover:bg-gray-50">
               Masuk 
            </Link>
         </NavbarItem>

         <NavbarItem className="text-sm">
            <Link to="/register" className="py-2.5 px-5 text-sm font-medium rounded-lg bg-cyan-950 text-white shadow-sm hover:bg-cyan-900">
               Daftar
            </Link>
         </NavbarItem>
      </>
   )
}
