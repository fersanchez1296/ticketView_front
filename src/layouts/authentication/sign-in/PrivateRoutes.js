import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "zustand/auth.store.ts";

const PrivateRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
