import useAuth from "./useAuth";
import { api } from "../services/api";

const useRefreshToken = () => {
  const { updateUser } = useAuth();

  const refresh = async () => {
    try {
      const { data } = await api.get("/refresh", {
        withCredentials: true,
      });

      if (!data.error) {
        updateUser(data.user);
      }

      return data.user.token;
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return refresh;
};

export default useRefreshToken;
