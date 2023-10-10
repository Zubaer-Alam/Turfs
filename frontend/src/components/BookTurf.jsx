import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Alert,
  Container,
  Pagination,
} from "react-bootstrap";
import { Booking } from "./Booking";

const BookTurf = () => {
  const [turfName, setTurfName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [turfNames, setTurfNames] = useState([]);
  const [slots, setSlots] = useState([]);

  const data = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:3000/turfs/turfNames", {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTurfNames(data);
      })
      .catch((error) => {
        console.error("Error fetching turf names:", error);
      });
  }, []);

  const updateSlots = (selectedTurf) => {
    fetch(`http://localhost:3000/turfs/slots?turfName=${selectedTurf}`)
      .then((response) => response.json())
      .then((data) => {
        setSlots(data);
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching slots:", error);
      });
  };

  useEffect(() => {
    if (turfName) {
      updateSlots(turfName);
    }
  }, [turfName]);

  useEffect(() => {
    fetch(
      `http://localhost:3000/bookings?number=${data.number}&page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setBookingData(data.bookings);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error("Error fetching booking data:", error));
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        .then((data) => console.log(data))
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

  let items = [];
  for (let i = 1; i <= totalPages; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }
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
            <Pagination className="p-3 justify-content-center">
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
              />
              {items}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </Pagination>
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
                  <option value="">Select</option>
                  {turfNames.map((turfName) => (
                    <option key={turfName} value={turfName}>
                      {turfName}
                    </option>
                  ))}
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
                <Form.Label>Select Slot</Form.Label>
                <Form.Select
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="">Slots</option>
                  {slots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </Form.Select>
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

export default BookTurf;
