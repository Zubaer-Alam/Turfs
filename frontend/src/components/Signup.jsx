import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Button, Card, Form, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, number, password);
    setName("");
    setEmail("");
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
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{JSON.stringify(error)}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group id="email">
                <Form.Label>E-Mail</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

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
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button disabled={isLoading} className="w-100 mt-3" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In!</Link>
        </div>
      </div>
    </Container>
  );
};
export default Signup;
