import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const RedirectLogin = (props) => {
   return props.msg === "belum login" ? <Outlet/> : <Navigate to="/"/>
}

export default RedirectLogin
