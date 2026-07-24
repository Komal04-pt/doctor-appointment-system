import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAdminDetails,
  updateAdmin,
  deleteAdmin,
} from "../../redux/actions/userAction";
import { reset } from "../../redux/slice/userSlice";
import InputForm from "../../components/Forms/InputForm";
import toast from "react-hot-toast";

const AdminDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [edit, setEdit] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { admin, error, loading, adminActionSuccess } = useSelector(
    (state) => state.user
  );

  const localData = localStorage.getItem("appData");
  const appData = localData ? JSON.parse(localData) : null;
  const currentAdminId = appData?.user?._id;
  const isSelfProfile = currentAdminId === id;

  useEffect(() => {
    dispatch(reset());
    dispatch(getAdminDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (admin) {
      setName(admin?.name || "");
      setPhone(admin?.phone || "");
    }
  }, [admin]);

  const handleUpdate = () => {
    dispatch(updateAdmin({ id, name, phone }));
  };

  const handleDeleteAdmin = () => {
    if (isSelfProfile) {
      return toast.error("You cannot delete your own admin account");
    }
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this admin account? This action cannot be undone."
    );
    if (confirmDelete) {
      dispatch(deleteAdmin(id));
    }
  };

  useEffect(() => {
    if (adminActionSuccess) {
      toast.success("Action completed successfully");
      dispatch(reset());
      navigate("/all-admins");
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [adminActionSuccess, error, dispatch, navigate]);

  return (
    <Layout>
      <div className="container py-3 py-md-4" style={{ minHeight: "75vh", maxWidth: "650px" }}>
        
        {/* Main Card Container */}
        <div className="card shadow-sm border-0 p-3 p-md-4 bg-white rounded-3">
          
          {/* Header Section */}
          <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 border-bottom mb-3 gap-2">
            <h4 className="mb-0 text-secondary font-weight-bold" style={{ fontSize: "1.25rem" }}>
              Admin Details
            </h4>

            {/* Buttons in One Single Row */}
            <div className="d-flex align-items-center gap-2">
              <button
                className={`btn btn-sm ${edit ? "btn-warning text-dark" : "btn-secondary"} fw-semibold`}
                onClick={() => setEdit(!edit)}
              >
                {edit ? "EDIT" : "CANCEL"}
              </button>
              <button
                className="btn btn-sm btn-danger fw-semibold"
                onClick={handleDeleteAdmin}
                disabled={isSelfProfile}
                title={
                  isSelfProfile
                    ? "You cannot delete your own account"
                    : "Delete this admin account"
                }
              >
                DELETE ACCOUNT
              </button>
            </div>
          </div>

          {/* Self Profile Alert */}
          {isSelfProfile && (
            <div className="alert alert-info small py-2 px-3 mb-3 border-0 bg-light-info text-info">
              <i className="bi bi-info-circle me-1"></i> This is your own account. You cannot delete your own admin access.
            </div>
          )}

          {/* Form Fields Section */}
          <div className="d-flex flex-column gap-2">
            <InputForm
              label={"Full Name"}
              value={name}
              setValue={setName}
              disabled={edit}
            />
            <InputForm
              label={"Email"}
              value={admin?.email || ""}
              setValue={() => {}}
              disabled={true}
            />
            <InputForm
              label={"Phone"}
              value={phone}
              setValue={setPhone}
              disabled={edit}
            />

            {!edit && (
              <div className="mt-3 text-end">
                <button
                  className="btn btn-primary btn-sm px-4 fw-semibold"
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "SAVE CHANGES"}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default AdminDetails;