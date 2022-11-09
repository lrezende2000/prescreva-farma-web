import React from "react";

import { api } from "../services/api";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxios = () => {
  const refreshToken = useRefreshToken();
  const { user, handleLogout } = useAuth();

  React.useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      const newConfig = { ...config };
      if (!config.headers?.Authorization) {
        newConfig.headers.Authorization = `Bearer ${user?.token}`;
      }

      return newConfig;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;

        if (err?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refreshToken();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(prevRequest);
        }

        if (prevRequest?.sent && err?.response?.status === 401) {
          handleLogout();
        }

        return Promise.reject(err);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [user, refreshToken, handleLogout]);

  return api;
};

export default useAxios;
