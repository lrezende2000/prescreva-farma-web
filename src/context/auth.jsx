import { createContext, useState } from "react";

export const AuthContext = createContext({
  user: undefined,
  handleLogin: () => {},
  handleLogout: () => {},
  restoreSession: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin: () => {},
        handleLogout: () => {},
        restoreSession: () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
