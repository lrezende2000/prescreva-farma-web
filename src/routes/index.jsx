import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import NewAccount from "../pages/NewAccount";
import Home from "../pages/Home";
import PatientList from "../pages/Patient/List";
import AppointmentList from "../pages/Appointment/List";
import PrescriptionList from "../pages/Prescription/List";
import ForwardList from "../pages/Forward/List";
import MedicineList from "../pages/Medicine/List";
import CreatePatient from "../pages/Patient/Create";
import CreateAppointment from "../pages/Appointment/Create";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="entrar" element={<Login />} />
        <Route path="esqueci-senha" element={<ForgotPassword />} />
        <Route path="criar-conta" element={<NewAccount />} />
        <Route path="home" element={<Home />} />
        <Route path="pacientes" element={<PatientList />} />
        <Route path="pacientes/novo" element={<CreatePatient />} />
        <Route path="consultas" element={<AppointmentList />} />
        <Route path="consultas/novo" element={<CreateAppointment />} />
        <Route path="prescricao" element={<PrescriptionList />} />
        <Route path="encaminhamentos" element={<ForwardList />} />
        <Route path="farmacos" element={<MedicineList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
