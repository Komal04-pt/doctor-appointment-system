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
      <div className="d-flex flex-wrap p-3 justify-content-between align-items-center bg-light">
        <h1 style={{ fontSize: "1.5rem" }}>Admin Details</h1>
        <div>
          <button
            className="btn btn-warning ms-3"
            onClick={() => setEdit(!edit)}
          >
            {edit ? "EDIT" : "CANCEL"}
          </button>
          <button
            className="btn btn-danger ms-3"
            onClick={handleDeleteAdmin}
            disabled={isSelfProfile}
            title={
              isSelfProfile
                ? "You cannot delete your own account"
                : "Delete this admin account"
            }
          >
            DELETE ADMIN ACCOUNT
          </button>
        </div>
      </div>

      {isSelfProfile && (
        <div className="alert alert-info mx-3 mt-3 mb-0">
          This is your own account. You cannot delete your own admin access.
        </div>
      )}

      <div className="p-3" style={{ maxWidth: "500px" }}>
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
          <button
            className="btn btn-primary mt-2"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Saving..." : "SAVE CHANGES"}
          </button>
        )}
      </div>
    </Layout>
  );
};

export default AdminDetails;