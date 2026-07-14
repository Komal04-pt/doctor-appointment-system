import React, { useEffect, useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/slice/authSlice";
import { login } from "../../redux/actions/authActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please Provide email or password");
    }
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (success) {
      toast.success("login successfully");
      navigate("/doctors");
      setEmail("");
      setPassword("");
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
          <h2>Welcome Back</h2>
          <p>Please enter your email & password to login</p>
          
          <form onSubmit={handleSubmit}>
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
              disabled={!email || !password}
            >
              LOGIN
            </button>
          </form>
          
          <p className="mt-4 pt-2 border-top">
            Not A user ? <NavLink to="/register" className="ms-1">Register here!</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;