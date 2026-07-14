import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAdmin } from "../../redux/actions/userAction";
import { reset } from "../../redux/slice/userSlice";
import InputForm from "../../components/Forms/InputForm";
import toast from "react-hot-toast";
import "./Allusers.css";

const AddAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { success, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const handleSubmit = () => {
    if (!name || !email || !password) {
      return toast.error("Please fill all required fields");
    }
    if (password.length < 6) {
      return toast.error("Password should be at least 6 characters");
    }
    dispatch(createAdmin({ name, email, password, phone }));
  };

  useEffect(() => {
    if (success) {
      toast.success("New Admin Created Successfully");
      dispatch(reset());
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      navigate("/all-admins");
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, dispatch, navigate]);

  return (
    <Layout>
      <div className="users-header">
        <h2>Add New Admin</h2>
        <p>
          Create a new staff account with admin access. This person will be
          able to log in and manage users, doctors, and appointments.
        </p>
      </div>

      <div
        className="users-table-wrapper p-4"
        style={{ maxWidth: "500px" }}
      >
        <InputForm label={"Full Name"} value={name} setValue={setName} />
        <InputForm
          label={"Email Address"}
          value={email}
          setValue={setEmail}
          inputType="email"
        />
        <InputForm
          label={"Phone Number (Optional)"}
          value={phone}
          setValue={setPhone}
          inputType="text"
        />
        <InputForm
          label={"Password"}
          value={password}
          setValue={setPassword}
          inputType="password"
        />

        <button
          className="btn btn-primary mt-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "CREATE ADMIN"}
        </button>
      </div>
    </Layout>
  );
};

export default AddAdmin;