/* eslint-disable no-nested-ternary */
import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { user } = useAuth();

  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/entrar" state={{ from: location }} replace />
  );
};

export default RequireAuth;
