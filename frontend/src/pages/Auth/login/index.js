import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../redux/actions/AuthAction";
import "./login.css";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const [data, setData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data) {
      try {
        dispatch(login(data));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="auth-page">
      <div className="login">
        <h1>Login</h1>
        <p>Explore your thoughts with the world</p>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="First Name"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <button disabled={loading} type="submit" className="btn ">
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="links">
          <span>Don't have an account?</span>
          <span onClick={() => navigate("/auth/signup")}>Sign Up</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
