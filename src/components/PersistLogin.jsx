/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const refreshToken = useRefreshToken();
  const { user } = useAuth();

  React.useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (!user?.token) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return isLoading ? <CircularProgress size={40} /> : <Outlet />;
};

export default PersistLogin;
