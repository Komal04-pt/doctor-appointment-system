import React, { useEffect, useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/authActions";
import { reset } from "../../redux/slice/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("Please Provide all fields");
    }
    dispatch(register({ name, email, password }));
  };

  useEffect(() => {
    if (success) {
      toast.success("Register successfully");
      navigate("/login");
      setName("");
      setEmail("");
      setPassword("");
      dispatch(reset());
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [dispatch, error, success, navigate]);

  return (
    <>
      <div className="auth-container">
        <div className="card">
          <h2>Create Account</h2>
          <p>Please enter your details to register</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 text-start">
              <input
                type="text"
                placeholder="enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group mb-3 text-start">
              <input
                type="email"
                placeholder="enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group mb-4 text-start">
              <input
                type="password"
                placeholder="enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!name || !email || !password}
            >
              REGISTER
            </button>
          </form>
          
          <p className="mt-4 pt-2 border-top">
            Already A user ? <NavLink to="/login" className="ms-1">Login here!</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;