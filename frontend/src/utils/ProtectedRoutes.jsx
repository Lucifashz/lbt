import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
   const [isLogin, setIsLogin] = React.useState(null);

   React.useEffect(() => {
      refreshToken();
   }, [])

   // Agar axios dapat membaca cookies
   axios.defaults.withCredentials = true;

   const refreshToken = async () => {
      await axios.get("http://localhost:3000/token")
      .then((response) => {
      }).catch((error) => {
         if (error.response) {
            setIsLogin(true)
         }
      });
   }

   return !isLogin ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoutes
