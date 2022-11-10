import { Routes, Route, Navigate } from "react-router-dom";

import PersistLogin from "../components/PersistLogin";
import RequireAuth from "../components/RequireAuth";
import CreateUser from "../admin/pages/User/Create";
import UserList from "../admin/pages/User/List";
import AvaliationList from "../admin/pages/Avaliacao/List";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="usuario" element={<UserList />} />
          <Route path="usuario/novo" element={<CreateUser />} />
          <Route path="avaliacao" element={<AvaliationList />} />
          <Route path="*" element={<Navigate to="/usuario" />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
