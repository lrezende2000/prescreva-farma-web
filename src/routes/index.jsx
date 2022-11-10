import { BrowserRouter } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

const Router = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {user?.isAdmin ? <AdminRoutes /> : <UserRoutes />}
    </BrowserRouter>
  );
};

export default Router;
