/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Outlet } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

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

  return isLoading ? (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  ) : (
    <Outlet />
  );
};

export default PersistLogin;
