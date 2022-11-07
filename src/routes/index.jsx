import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PersistLogin from "../components/PersistLogin";
import RequireAuth from "../components/RequireAuth";
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
import CreatePrescription from "../pages/Prescription/Create";
import CreateForward from "../pages/Forward/Create";
import UpdatePatient from "../pages/Patient/Update";
import ViewPrescription from "../pages/Prescription/View";
import ViewForward from "../pages/Forward/View";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="entrar" element={<Login />} />
          <Route path="esqueci-senha" element={<ForgotPassword />} />
          <Route path="criar-conta" element={<NewAccount />} />
          <Route element={<RequireAuth />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="home" element={<Home />} />
            <Route path="pacientes" element={<PatientList />} />
            <Route path="pacientes/novo" element={<CreatePatient />} />
            <Route path="pacientes/editar/:id" element={<UpdatePatient />} />
            <Route path="consultas" element={<AppointmentList />} />
            <Route path="consultas/novo" element={<CreateAppointment />} />
            <Route path="prescricao" element={<PrescriptionList />} />
            <Route path="prescricao/novo" element={<CreatePrescription />} />
            <Route path="prescricao/ver/:id" element={<ViewPrescription />} />
            <Route path="encaminhamentos" element={<ForwardList />} />
            <Route path="encaminhamentos/novo" element={<CreateForward />} />
            <Route path="encaminhamentos/ver/:id" element={<ViewForward />} />
            <Route path="farmacos" element={<MedicineList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
