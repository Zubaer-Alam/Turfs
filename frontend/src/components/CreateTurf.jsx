import { useEffect, useState } from "react";

import { Button, Card, Form, Container } from "react-bootstrap";

const CreateTurf = () => {
  const [turfName, setTurfName] = useState("");
  const [slots, setSlots] = useState([]);
  const [dayTimes, setDayTimes] = useState([]);
  const [nightTimes, setNightTimes] = useState([]);

  const data = JSON.parse(localStorage.getItem("user"));

  const createTurf = async (e) => {
    e.preventDefault();
    const turf = { turfName, slots, dayTimes, nightTimes };

    try {
      const response = await fetch("http://localhost:3000/turfs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(turf),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Turf created:", responseData);
        setTurfName("");
        setSlots([]);
        setDayTimes([]);
        setNightTimes([]);
      } else {
        console.error(
          "Error creating turf:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error creating turf:", error);
    }
  };

  const handleSlotChange = (e, slot) => {
    if (e.target.checked) {
      setSlots([...slots, slot]);
    } else {
      setSlots(slots.filter((s) => s !== slot));
    }
  };

  const handleDayTimeChange = (e, time) => {
    if (e.target.checked) {
      setDayTimes([...dayTimes, time]);
    } else {
      setDayTimes(dayTimes.filter((t) => t !== time));
    }
  };

  const handleNightTimeChange = (e, time) => {
    if (e.target.checked) {
      setNightTimes([...nightTimes, time]);
    } else {
      setNightTimes(nightTimes.filter((t) => t !== time));
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Create Turf</h2>
            <Form onSubmit={createTurf}>
              <Form.Group id="name">
                <Form.Label>Turf Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={turfName}
                  onChange={(e) => setTurfName(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Slots:</Form.Label>
                <div className="d-flex justify-content-center gap-5">
                  <Form.Check
                    inline
                    label="Day"
                    name="group1"
                    type="checkbox"
                    id="day"
                    checked={slots.includes("day")}
                    onChange={(e) => handleSlotChange(e, "day")}
                  />
                  <Form.Check
                    inline
                    label="Night"
                    name="group1"
                    type="checkbox"
                    id="night"
                    checked={slots.includes("night")}
                    onChange={(e) => handleSlotChange(e, "night")}
                  />
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label>Day Slot:</Form.Label>
                <div className="d-flex justify-content-center">
                  <Form.Check
                    inline
                    label="8:00 AM"
                    name="group1"
                    type="checkbox"
                    id="day"
                    checked={dayTimes.includes("8:00 AM")}
                    onChange={(e) => handleDayTimeChange(e, "8:00 AM")}
                  />
                  <Form.Check
                    inline
                    label="10:00 AM"
                    name="group1"
                    type="checkbox"
                    id="night"
                    checked={dayTimes.includes("10:00 AM")}
                    onChange={(e) => handleDayTimeChange(e, "10:00 AM")}
                  />
                  <Form.Check
                    inline
                    label="12:00 PM"
                    name="group1"
                    type="checkbox"
                    id="night"
                    checked={dayTimes.includes("12:00 PM")}
                    onChange={(e) => handleDayTimeChange(e, "12:00 PM")}
                  />
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label>Night Slot:</Form.Label>
                <div className="d-flex justify-content-center">
                  <Form.Check
                    inline
                    label="8:00 PM"
                    name="group1"
                    type="checkbox"
                    id="day"
                    checked={nightTimes.includes("8:00 PM")}
                    onChange={(e) => handleNightTimeChange(e, "8:00 PM")}
                  />
                  <Form.Check
                    inline
                    label="10:00 PM"
                    name="group1"
                    type="checkbox"
                    id="night"
                    checked={nightTimes.includes("10:00 PM")}
                    onChange={(e) => handleNightTimeChange(e, "10:00 PM")}
                  />
                  <Form.Check
                    inline
                    label="12:00 AM"
                    name="group1"
                    type="checkbox"
                    id="night"
                    checked={nightTimes.includes("12:00 AM")}
                    onChange={(e) => handleNightTimeChange(e, "12:00 AM")}
                  />
                </div>
              </Form.Group>

              <Button className="w-100 mt-3" type="submit">
                Create
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default CreateTurf;
