import { Button, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import login from "../assets/login.png";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication-container">
      <div className="authentication-form card p-4">
        <h1 className="design-card-title">Nice to Meet U</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="name" />
          </Form.Item>
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
              REGISTER
            </Button>

            <Link to="/login" className="anchor px-3 ">
              go to LOGIN
            </Link>
          </div>
        </Form>

        <div className="signin-up col-md-5 mx-2 mt-2"></div>
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

export default Register;
