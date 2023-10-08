import { useState, useEffect } from "react";
import { Button, Card, Form, Alert, Container } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { Booking } from "./Booking";

const Dashboard = () => {
  const [turfName, setTurfName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState([]);

  const data = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetch(`http://localhost:3000/bookings?number=${data.number}`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setBookingData(data))
      .catch((error) => console.error("Error fetching booking data:", error));
  }, []);

  const createBooking = async (e) => {
    e.preventDefault();
    const booking = { turfName, date, time, number: data.number };
    const response = await fetch("http://localhost:3000/bookings", {
      method: "POST",
      body: JSON.stringify(booking),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    });

    if (response.ok) {
      fetch(`http://localhost:3000/bookings?number=${data.number}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setBookingData(data))
        .catch((error) => console.error("Error fetching booking data:", error));

      setTurfName("");
      setDate("");
      setTime("");
      setError(null);
    }
    if (!response.ok) {
      response.json().then((data) => setError(data.error));
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100 p-1" style={{ maxWidth: "400px" }}>
        <div className="p-1">
          <Card>
            <Card.Body>
              Username : {data.username}
              <br />
              Number : {data.number}
              <br />
            </Card.Body>
          </Card>
        </div>
        <div className="p-1">
          <Card>
            <Card.Body>
              {Array.isArray(bookingData) ? (
                bookingData.map((booking, index) => (
                  <Booking key={index} booking={booking} />
                ))
              ) : (
                <p>No bookings for this user</p>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Book Turf</h2>
            {error && <Alert variant="danger">{JSON.stringify(error)}</Alert>}
            <Form onSubmit={createBooking}>
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
                  <option value="Delta">Delta</option>
                  <option value="Echo">Echo</option>
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
