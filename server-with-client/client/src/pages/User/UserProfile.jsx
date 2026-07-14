import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import EditUserProfile from "./EditUserProfile";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../redux/slice/authSlice";
import { getLoginUserDetails } from "../../redux/actions/authActions";

const UserProfile = () => {
  const naviagte = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(reset());
    const localData = localStorage.getItem("appData");
    const appData = JSON.parse(localData);
    if (appData) {
      const id = appData?.user?._id;
      dispatch(getLoginUserDetails(id));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("appData");
    naviagte("/login");
    toast.success("logout successfully");
  };

  return (
    <>
      <div className="container py-3 py-md-5 px-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9">
            <h5 className="text-center mb-3 fw-bold text-dark fs-5 fs-md-4">
              Manage Your Account & Appointments
            </h5>
            
            <div className="card p-3 p-md-4 shadow-sm border border-light-subtle rounded-3">
              <div className="row align-items-center">
                
                <div className="col-md-4 text-center mb-3 mb-md-0">
                  <img
                    src={
                      user?.image
                        ? `data:image/jpeg;base64,${user?.image}`
                        : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                    }
                    alt="userPic"
                    className="img-fluid rounded-circle border border-2 shadow-sm mx-auto"
                    style={{ width: "120px", height: "120px", smWidth: "140px", smHeight: "140px", objectFit: "cover" }}
                  />
                </div>

                <div className="col-md-8">
                  <div className="user-container mb-2">
                    
                    <div className="row g-2 g-md-3 mb-2 text-start">
                      <div className="col-12 col-sm-6">
                        <div className="small text-muted mb-0">Name</div>
                        <div className="fw-semibold text-dark text-sm">{user?.name}</div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="small text-muted mb-0">Email</div>
                        <div className="fw-semibold text-dark text-sm text-break">{user?.email}</div>
                      </div>
                      <div className="col-6 col-sm-6">
                        <div className="small text-muted mb-0">Gender</div>
                        <div className="fw-semibold text-dark text-sm">{user?.gender || "NA"}</div>
                      </div>
                      <div className="col-6 col-sm-6">
                        <div className="small text-muted mb-0">Phone</div>
                        <div className="fw-semibold text-dark text-sm">{user?.phone || "NA"}</div>
                      </div>
                      <div className="col-6 col-sm-6">
                        <div className="small text-muted mb-0">DOB</div>
                        <div className="fw-semibold text-dark text-sm">{user?.dob || "NA"}</div>
                      </div>
                      <div className="col-6 col-sm-6">
                        <div className="small text-muted mb-0">Address</div>
                        <div className="fw-semibold text-dark text-sm">{user?.address || "NA"}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-2 border-t">
                      <Link to={`/user/reset-password/${user?._id}`} className="text-decoration-none small fw-medium text-primary">
                        <i className="fa-solid fa-key me-1 small"></i> Reset Password
                      </Link>
                    </div>
                  </div>

                  <div className="button-container d-flex flex-wrap gap-2 mt-3 pt-2 border-top">
                    <button
                      className="btn btn-warning btn-sm px-3 flex-grow-1 flex-sm-grow-0 fw-medium"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <i className="fa-solid fa-pen-to-square me-1"></i> Edit Profile
                    </button>
                    <button
                      className="btn btn-primary btn-sm px-3 flex-grow-1 flex-sm-grow-0 fw-medium"
                      onClick={() => naviagte("/user/appointments")}
                    >
                      <i className="fa-solid fa-list me-1"></i> Appointments
                    </button>
                    <button className="btn btn-danger btn-sm px-3 flex-grow-1 flex-sm-grow-0 fw-medium" onClick={handleLogout}>
                      <i className="fa-solid fa-power-off me-1"></i> LOGOUT
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {isOpen && (
        <EditUserProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default UserProfile;