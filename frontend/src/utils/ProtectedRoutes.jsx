import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
   return props.msg === undefined ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoutes
