import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Button, Card, Form, Alert, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(number, password);
    await login(number, password);
    setNumber("");
    setPassword("");
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{JSON.stringify(error)}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="number">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"//toggle
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button disabled={isLoading} className="w-100 mt-3" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Don't have an account? <Link to="/signup">Sign Up!</Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
