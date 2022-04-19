import { Button, Form, Input } from "antd";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../Firebase/Firebase";

const Registration = ({ setas }) => {
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [form] = Form.useForm();

  const Email = (e) => {
    setEmail(e.target.value);
  };
  const PassWord1 = (e) => {
    setPass1(e.target.value);
  };

  const ok = () => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, pass1)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Đăng ký thành công hay bắt đầu đăng nhập để mua hàng");
        form.resetFields();
        setas("1");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div>
      <Form form={form} onFinish={ok}>
        <Form.Item
          label="Username"
          name="username"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input value={email} onChange={Email} />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password value={pass1} onChange={PassWord1} />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Registration;
