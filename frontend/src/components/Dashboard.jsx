import { useState } from "react";
import { Button, Card, Form, Alert, Container } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";

const Dashboard = () => {
  const [turfName, setTurfName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { user } = useAuthContext();
  console.log(turfName);
  console.log(date);
  console.log(time);

  const book = async (e) => {
    e.preventDefault();
    const booking = { turfName, date, time };

    const response = await fetch("http://localhost:3000/booking", {
      method: "POST",
      body: JSON.stringify(booking),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      setTurfName("");
      setDate("");
      setTime("");
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100 p-4" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            Username : {user && user.username}
            <br />
            Email : {user && user.email}
            <br />
          </Card.Body>
        </Card>
      </div>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Book Turf</h2>
            <Form onSubmit={book}>
              <Form.Group id="name">
                <Form.Label>Select Turf</Form.Label>
                <Form.Select
                  required
                  aria-label="Default select"
                  value={turfName}
                  onChange={(e) => setTurfName(e.target.value)}
                >
                  <option>Select</option>
                  <option value="Alpha">Alpha</option>
                  <option value="Bravo">Bravo</option>
                  <option value="Charlie">Charlie</option>
                </Form.Select>
              </Form.Group>

              <Form.Group id="date">
                <Form.Label>Select Date</Form.Label>
                <Form.Control
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group id="time">
                <Form.Label>Select Time</Form.Label>
                <Form.Control
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </Form.Group>

              <Button className="w-100 mt-3" type="submit">
                Book
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};
export default Dashboard;
