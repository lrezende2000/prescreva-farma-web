import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import NewAccount from "../pages/NewAccount";
import Home from "../pages/Home";
import PatientList from "../pages/Patient/List";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="entrar" element={<Login />} />
        <Route path="esqueci-senha" element={<ForgotPassword />} />
        <Route path="criar-conta" element={<NewAccount />} />
        <Route path="home" element={<Home />} />
        <Route path="pacientes" element={<PatientList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
