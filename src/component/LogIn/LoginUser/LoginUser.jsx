import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { GooglePlusOutlined } from "@ant-design/icons";
import app from "../../Firebase/Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { DataLogin, OnlogIn } from "../../redux/Reducer";
import { UserFirebase } from "../../redux/ReducerCart";
import { LogInGoogle } from "./FunctionLogin";

const LoginUser = ({ handleCancel }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [form] = Form.useForm();
  const distpatch = useDispatch();
  const axx = true;
  const goole = LogInGoogle();
  //  dang nhap bang google firebase
  const loginGoogle = () => {
    goole();
    handleCancel();
  };
  //  lay du lieu  email bang input
  const setEmailPass = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPass(e.target.value);
    }
  };
  //  đăng nhập bằng email firebase
  const LogInPassWord = () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        alert("Đăng nhập thành công");
        const user = userCredential.user;
        distpatch(DataLogin(user.providerData));
        distpatch(UserFirebase(user.providerData));
        distpatch(OnlogIn(axx));
        handleCancel();
        form.resetFields();
      })
      .catch((error) => {
        alert("sai tên đăng nhập hoặc mật khẩu");
      });
  };
  return (
    <div>
      <Form form={form} onFinish={LogInPassWord}>
        <Form.Item
          label="Username"
          name="Username"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input value={email} onChange={setEmailPass} name="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="Password"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={pass}
            onChange={setEmailPass}
            name="password"
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            pull: 0,
            push: 1,
          }}
        >
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
          <Button
            style={{ marginLeft: "10px", background: "#000", color: "#fff" }}
            onClick={loginGoogle}
          >
            Sign in with Google
            <GooglePlusOutlined />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginUser;
