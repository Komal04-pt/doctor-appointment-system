import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout/Layout";
import { getAllUsers, getAllAdmins } from "../redux/actions/userAction"; 
import { getAllDoctors } from "../redux/actions/doctorActions";
import { getUserData } from "../redux/actions/authActions"; 
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth || {});
  const { users, admins } = useSelector((state) => state.user || {});
  const { doctors } = useSelector((state) => state.doctor || {});

  useEffect(() => {
    if (!user) {
      dispatch(getUserData());
    }
    dispatch(getAllUsers());
    dispatch(getAllDoctors());
    dispatch(getAllAdmins());
  }, [dispatch, user]);

  return (
    <Layout>
      <div className="card p-4 text-center text-white border-0 rounded-3 mb-4 mt-3" style={{ backgroundColor: "#0f6c5f" }}>
        <h1 className="fw-bold mb-1">Dashboard</h1>
        <p className="mb-3 opacity-75">CR Global Hospital — Admin Panel</p>
        <div className="d-inline-block px-4 py-2 bg-white bg-opacity-10 rounded-pill small">
          Welcome back, <span className="fw-bold">{user?.name || "Admin"}</span> · {user?.email || "No Email"}
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card p-4 border-0 shadow-sm d-flex flex-row align-items-center gap-3 bg-white rounded-3">
            <div className="fs-1 text-secondary"><i className="fa-solid fa-users"></i></div>
            <div>
              <h2 className="fw-bold mb-0">{users?.length || 0}</h2>
              <span className="text-muted small">Total Users</span>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card p-4 border-0 shadow-sm d-flex flex-row align-items-center gap-3 bg-white rounded-3">
            <div className="fs-1 text-secondary"><i className="fa-solid fa-heart-pulse"></i></div>
            <div>
              <h2 className="fw-bold mb-0">{doctors?.length || 0}</h2>
              <span className="text-muted small">Total Doctors</span>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card p-4 border-0 shadow-sm d-flex flex-row align-items-center gap-3 bg-white rounded-3">
            <div className="fs-1 text-secondary"><i className="fa-solid fa-user-shield"></i></div>
            <div>
              <h2 className="fw-bold mb-0">{admins?.length || 0}</h2> 
              <span className="text-muted small">Total Admins</span>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card p-4 border-0 shadow-sm d-flex flex-row align-items-center gap-3 bg-white rounded-3">
            <div className="fs-1 text-secondary"><i className="fa-solid fa-dollar-sign"></i></div>
            <div>
              <h2 className="fw-bold mb-0">₹15700</h2>
              <span className="text-muted small">Total Earnings</span>
            </div>
          </div>
        </div>
      </div>

      <h5 className="fw-bold text-dark mb-3">Quick Actions</h5>
      <div className="row g-3">
        <div onClick={() => navigate("/all-users")} className="col-12 col-sm-6 col-lg-3" style={{ cursor: "pointer" }}>
          <div className="card p-3 border-0 shadow-sm bg-white rounded-3 d-flex flex-row align-items-center gap-3 h-100">
            <div className="fs-3 text-secondary"><i className="fa-solid fa-user-gear"></i></div>
            <div>
              <h6 className="fw-bold mb-0" style={{ fontSize: "0.95rem" }}>Manage Users</h6>
              <span className="text-muted extra-small" style={{ fontSize: "0.8rem" }}>View and manage patient accounts</span>
            </div>
          </div>
        </div>

        <div onClick={() => navigate("/all-doctors")} className="col-12 col-sm-6 col-lg-3" style={{ cursor: "pointer" }}>
          <div className="card p-3 border-0 shadow-sm bg-white rounded-3 d-flex flex-row align-items-center gap-3 h-100">
            <div className="fs-3 text-secondary"><i className="fa-solid fa-user-doctor"></i></div>
            <div>
              <h6 className="fw-bold mb-0" style={{ fontSize: "0.95rem" }}>Manage Doctors</h6>
              <span className="text-muted extra-small" style={{ fontSize: "0.8rem" }}>Add or update doctor profiles</span>
            </div>
          </div>
        </div>

        <div onClick={() => navigate("/all-appointments")} className="col-12 col-sm-6 col-lg-3" style={{ cursor: "pointer" }}>
          <div className="card p-3 border-0 shadow-sm bg-white rounded-3 d-flex flex-row align-items-center gap-3 h-100">
            <div className="fs-3 text-secondary"><i className="fa-solid fa-calendar-check"></i></div>
            <div>
              <h6 className="fw-bold mb-0" style={{ fontSize: "0.95rem" }}>All Appointments</h6>
              <span className="text-muted extra-small" style={{ fontSize: "0.8rem" }}>Review and update patient visits</span>
            </div>
          </div>
        </div>

        <div onClick={() => navigate("/all-messages")} className="col-12 col-sm-6 col-lg-3" style={{ cursor: "pointer" }}>
          <div className="card p-3 border-0 shadow-sm bg-white rounded-3 d-flex flex-row align-items-center gap-3 h-100">
            <div className="fs-3 text-warning"><i className="fa-solid fa-envelope-open-text"></i></div>
            <div>
              <h6 className="fw-bold mb-0" style={{ fontSize: "0.95rem" }}>User Messages</h6>
              <span className="text-muted extra-small" style={{ fontSize: "0.8rem" }}>Review complaints & feedbacks</span>
            </div>
          </div>
        </div>

        <div onClick={() => navigate("/all-admins")} className="col-12 col-sm-6 col-lg-3" style={{ cursor: "pointer" }}>
          <div className="card p-3 border-0 shadow-sm bg-white rounded-3 d-flex flex-row align-items-center gap-3 h-100">
            <div className="fs-3 text-danger"><i className="fa-solid fa-user-shield"></i></div>
            <div>
              <h6 className="fw-bold mb-0" style={{ fontSize: "0.95rem" }}>Manage Admins</h6>
              <span className="text-muted extra-small" style={{ fontSize: "0.8rem" }}>View and handle admin privileges</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;