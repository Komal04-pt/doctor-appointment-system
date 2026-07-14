import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/authSlice";

const Menus = ({ onLinkClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
    localStorage.removeItem("appData");
    navigate("/");
  };
  return (
    <div className="d-flex flex-column bg-dark text-white" style={{ minHeight: "100vh" }}>
      <ul className="nav d-flex flex-column">
        <h4 className="mb-4 mt-4 text-center">Admin panel</h4>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/home"} onClick={onLinkClick}>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/all-users"} onClick={onLinkClick}>
            USERS
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/all-doctors"} onClick={onLinkClick}>
            DOCTORS
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/all-appointments"} onClick={onLinkClick}>
            APPOINTMENTS
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/all-messages"} onClick={onLinkClick}>
            MESSAGES
          </NavLink>
        </li>
        
<li className="nav-item">
  <NavLink className="nav-link" to={"/all-admins"} onClick={onLinkClick}>
    Admin Accounts
  </NavLink>
</li>
      </ul>
      <button className="btn btn-danger m-3 mt-auto" onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
};
export default Menus;