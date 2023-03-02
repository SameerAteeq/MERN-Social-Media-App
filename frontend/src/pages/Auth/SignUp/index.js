import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Signup } from "../../../redux/actions/AuthAction";
import "./signup.css";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const [data, setData] = useState(initialState);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.password === data.confirmpass) {
      dispatch(Signup(data));
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-page">
      <div className="signup">
        <h1>Sign Up</h1>
        <p>Explore your thoughts with the world</p>

        <form onSubmit={handleSubmit}>
          <div className="names">
            <input
              type="text"
              placeholder="First Name"
              required
              name="firstname"
              value={data.firstname}
              onChange={handleChange}
            />
            <input
              required
              name="lastname"
              type="text"
              placeholder="Last Name"
              value={data.lastname}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              required
              name="username"
              type="email"
              placeholder="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>

          <div className="names">
            <input
              required
              name="password"
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
            <input
              required
              name="confirmpass"
              type="password"
              placeholder="Confirm Password"
              value={data.confirmpass}
              onChange={handleChange}
            />
          </div>

          {isError && (
            <span className="error"> *Confirm password is not same</span>
          )}

          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>

        <div className="links">
          <span>Already have an account?</span>
          <span onClick={() => navigate("/auth/login")}>Login </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
