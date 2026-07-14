import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { reset } from "../../redux/slice/authSlice";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("user1@user.com");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email || !password) {
      return toast.error("please provide email or password");
    }
    dispatch(login({ email, password }));
  };

  const { success, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      toast.success("Login Successfully");
      navigate("/home");
      dispatch(reset());
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, dispatch, navigate]);

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <h1 className="login-title">Admin Panel</h1>
        <p className="login-subtitle">CR Global Hospital</p>

        <div className="login-field">
          <label className="login-label">Email address</label>
          <input
            type="email"
            className="login-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-field">
          <label className="login-label">Password</label>
          <input
            type="password"
            className="login-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <p className="login-footer">
          Secured Admin Access &middot; Authorized Personnel Only
        </p>
      </div>
    </div>
  );
};

export default Login;