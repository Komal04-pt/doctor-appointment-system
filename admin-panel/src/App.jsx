import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/user/Login";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Allusers from "./pages/user/Allusers";
import AllDoctors from "./pages/doctors/AllDoctors";
import DoctorDetails from "./pages/doctors/DoctorDetails";
import AllAppointments from "./pages/appointments/AllAppointments";
import AppointmentDetails from "./pages/appointments/AppointmentDetails";
import UserDetails from "./pages/user/UserDetails";
import AddDoctor from "./pages/doctors/AddDoctor";
import AllMessages from "./pages/messages/AllMessages"; // <--- Naya Page Import Kiya
import AddAdmin from "./pages/user/AddAdmin";
import AllAdmins from "./pages/user/AllAdmins";
import AdminDetails from "./pages/user/AdminDetails";


function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/all-users" element={<Allusers />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
        <Route path="/all-doctors" element={<AllDoctors />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/doctor-details/:id" element={<DoctorDetails />} />
        <Route path="/all-appointments" element={<AllAppointments />} />
        <Route path="/appointment-details/:id" element={<AppointmentDetails />} />
        <Route path="/all-messages" element={<AllMessages />} /> 
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/all-admins" element={<AllAdmins />} />
        <Route path="/admin-details/:id" element={<AdminDetails />} />
      </Routes>
    </>
  );
}

export default App;