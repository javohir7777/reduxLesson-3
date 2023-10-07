import { message } from "antd";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { requies } from "../../server";
import Cookies from "js-cookie";
import { TOKEN } from "../../container";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [handleValue, setHandleValue] = useState({
    username: "",
    password: "",
  });

  const handleUser = (e) => {
    setHandleValue({ ...handleValue, [e.target.id]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      let {
        data: {
          token,
          user: { role },
        },
      } = await requies.post("auth/login", handleValue);
      if (role === "user") {
        console.log("usercha");
      } else if (role === "admin") {
        console.log("admincha");
        navigate("/dashboard");
        Cookies.set(TOKEN, token);
      }
    } catch (error) {
      message.error("Error");
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Form onSubmit={submit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={handleUser}
            required
            type="text"
            placeholder="username"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleUser}
            required
            type="password"
            placeholder="password"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Button className="mt-3" type="submit">
          Submit form
        </Button>
      </Form>
    </div>
  );
};

export default Login;
