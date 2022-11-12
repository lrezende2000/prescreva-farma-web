import { createContext, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({
  user: undefined,
  updateUser: () => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const updateUser = (u) => {
    setUser((prevState) => ({ ...prevState, ...u }));
  };

  const handleLogout = async () => {
    await api.post("/logout", {}, { withCredentials: true });
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
