import { Routes, Route, Navigate } from "react-router-dom";

import PersistLogin from "../components/PersistLogin";
import RequireAuth from "../components/RequireAuth";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
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
import Profile from "../pages/User/Profile";
import ResetPassword from "../pages/ResetPassword";

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="entrar" element={<Login />} />
        <Route path="resetar-senha" element={<ResetPassword />} />
        <Route path="esqueci-senha" element={<ForgotPassword />} />
        <Route element={<RequireAuth />}>
          <Route index element={<Navigate to="/inicio" />} />
          <Route path="inicio" element={<Home />} />
          <Route path="minha-conta" element={<Profile />} />
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

        <Route path="*" element={<Navigate to="/inicio" />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
