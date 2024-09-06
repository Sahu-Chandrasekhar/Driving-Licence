import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
    // let isAuthenticated = localStorage.getItem("token");
    // let isAuthenticated = false;
    let isAuthenticated = useSelector(state => state.auth.authUser);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

