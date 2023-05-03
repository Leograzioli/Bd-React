import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  let auth = { token: Cookies.get('token') };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}