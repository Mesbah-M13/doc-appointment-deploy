import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/login.png";
import {showLoading,hideLoading} from "../redux/alertsSlice"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication-container ">
      <div className="authentication-form card p-3">
        <h1 className="design-card-title">Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="password" type="password" />
          </Form.Item>
          <div className="d-flex flex-column">
            <Button
              type="button"
              className="btn primary-btn my-3 full-width-button"
              htmlType="submit"
            >
              Login
            </Button>

            <Link to="/register" className="anchor ">
              go to REGISTER
            </Link>
          </div>
        </Form>
      </div>
      <img
        src={login}
        alt="login-img"
        style={{
          width: "75%",
          height: "auto",
        }}
      />
    </div>
  );
};

export default Login;
