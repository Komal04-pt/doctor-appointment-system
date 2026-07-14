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
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9">
            <h4 className="text-center mb-4">Manage Your Account & Appointments</h4>
            
            <div className="card p-4 shadow-sm">
              <div className="row align-items-center">
                
                <div className="col-md-4 text-center mb-3 mb-md-0">
                  <img
                    src={
                      user?.image
                        ? `data:image/jpeg;base64,${user?.image}`
                        : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                    }
                    alt="userPic"
                    className="img-fluid rounded-circle border"
                    style={{ width: "155px", height: "155px", objectFit: "cover" }}
                  />
                </div>

                <div className="col-md-8">
                  <div className="user-container mb-3">
                    
                    <div className="row g-3 mb-2">
                      <div className="col-sm-6">
                        <h6>Name : {user?.name}</h6>
                      </div>
                      <div className="col-sm-6">
                        <h6>Email : {user?.email}</h6>
                      </div>
                      <div className="col-sm-6">
                        <h6>Gender : {user?.gender || "NA"}</h6>
                      </div>
                      <div className="col-sm-6">
                        <h6>Phone : {user?.phone || "NA"}</h6>
                      </div>
                      <div className="col-sm-6">
                        <h6>DOB : {user?.dob || "NA"}</h6>
                      </div>
                      <div className="col-sm-6">
                        <h6>Address : {user?.address || "NA"}</h6>
                      </div>
                    </div>
                    
                    <h4 className="mt-3">
                      <Link to={`/user/reset-password/${user?._id}`} style={{ fontSize: "1.05rem" }}>
                        Reset Password
                      </Link>
                    </h4>
                  </div>

                  <div className="button-container d-flex flex-wrap gap-2 mt-4">
                    <button
                      className="btn btn-warning"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i> Edit Profile
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => naviagte("/user/appointments")}
                    >
                      <i className="fa-solid fa-list"></i> Appointments
                    </button>
                    <button className="btn btn-danger" onClick={handleLogout}>
                      <i className="fa-solid fa-power-off"></i> LOGOUT
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