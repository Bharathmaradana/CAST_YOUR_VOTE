import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import "./main.css";
import { store } from "../App";
import logingif from "./img-01.png";

function Login() {
  const navigate = useNavigate();
  const [token, settoken] = useContext(store);

  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const submitdata = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5003/login", data).then((res) => {
      console.log("something");
      console.log(res.data);
      if (res.data.token) {
        if (res.data.token != null) {
          localStorage.setItem("token", res.data.token);
        } else {
          alert("please enter correct password");
        }
      } else {
        alert("Please Register there is no account");
      }
      setdata({
        email: "",
        password: "",
      });
    });
  };

  if (localStorage.getItem("token")) {
    console.log("something");
    return <Navigate to="/Rooms" />;
  }

  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div
              className="login100-pic js-tilt"
              data-tilt
              style={{ marginTop: "-10%" }}
            >
              <img src={logingif} alt="IMG" />
            </div>

            <form
              className="login100-form validate-form"
              style={{ marginTop: "-10%" }}
              onSubmit={submitdata}
            >
              <span className="login100-form-title">Member Login</span>

              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={data.email}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <FaUserAlt />
                </span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={data.password}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <RiLockPasswordLine />
                </span>
              </div>

              <div className="container-login100-form-btn">
                <button
                  className="login100-form-btn"
                  // onClick={() => submitdata()}
                >
                  Login
                </button>
              </div>

              <div className="text-center p-t-12">
                <span className="txt1">Forgot</span>
                <a className="txt2" href="#">
                  Username / Password?
                </a>
              </div>

              <div className="text-center p-t-136">
                <a className="txt2" href="/register">
                  Create your Account
                  <i
                    className="fa fa-long-arrow-right m-l-5"
                    aria-hidden="true"
                  ></i>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
