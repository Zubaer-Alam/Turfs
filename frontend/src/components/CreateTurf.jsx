import { useEffect, useState } from "react";
import { Button, Card, Form, Container, Alert } from "react-bootstrap";

const CreateTurf = () => {
  const [turfName, setTurfName] = useState("");
  const [slots, setSlots] = useState([]);
  const [dayTimes, setDayTimes] = useState([" "]);
  const [nightTimes, setNightTimes] = useState([" "]);
  const [error, setError] = useState(null);

  const data = JSON.parse(localStorage.getItem("user"));

  const createTurf = async (e) => {
    e.preventDefault();
    const turf = { turfName, slots, dayTimes, nightTimes };
    console.log(turf)

    try {
      const response = await fetch("http://localhost:3000/turfs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(turf),
      });
      console.log(response);
      if (response.ok) {
        const responseData = await response.json();
        console.log("Turf created:", responseData);
        setTurfName("");
        setSlots([]);
        setDayTimes([" "]);
        setNightTimes([" "]);
        setError(null);
      } else {
        response.json().then((data) => setError(data.error));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSlotChange = (e, slot) => {
    if (e.target.checked) {
      setSlots([...slots, slot]);
    } else {
      setSlots(slots.filter((s) => s !== slot));
    }
  };

  const addDayTimeEntry = () => {
    const lastTimeRange = dayTimes[dayTimes.length - 1];
    const [from, to] = lastTimeRange.split(" ");

    if (from && to) {
      const fromTime = new Date(`1970-01-01T${from}`);
      const toTime = new Date(`1970-01-01T${to}`);
      const timeDifferenceInMinutes = (toTime - fromTime) / (1000 * 60);

      if (timeDifferenceInMinutes >= 30) {
        if (dayTimes.length < 5) {
          setDayTimes([...dayTimes, ""]);
        }
      } else {
        alert("Each slot should have 30 minutes");
      }
    } else {
      setError("Fill in time field");
    }
  };

  const addNightTimeEntry = () => {
    const lastTimeRange = nightTimes[nightTimes.length - 1];
    const [from, to] = lastTimeRange.split(" ");

    if (from && to) {
      const fromTime = new Date(`1970-01-01T${from}`);
      const toTime = new Date(`1970-01-01T${to}`);
      const timeDifferenceInMinutes = (toTime - fromTime) / (1000 * 60);

      if (timeDifferenceInMinutes >= 30) {
        if (nightTimes.length < 5) {
          setNightTimes([...nightTimes, ""]);
        }
      } else {
        alert("Each slot should have at least 30 minutes");
      }
    } else {
      setError("Fill in time field");
    }
  };

  const removeLastDayTimeEntry = () => {
    if (dayTimes.length > 0) {
      const updatedDayTimes = [...dayTimes];
      updatedDayTimes.pop();
      setDayTimes(updatedDayTimes);
      setError(null);
    }
  };

  const removeLastNightTimeEntry = () => {
    if (nightTimes.length > 0) {
      const updatedNightTimes = [...nightTimes];
      updatedNightTimes.pop();
      setNightTimes(updatedNightTimes);
      setError(null);
    }
  };

  const handleDayTimeChange = (value, index, field) => {
    const updatedDayTimes = [...dayTimes];
    const timeRange = updatedDayTimes[index].split(" ");
    if (field === "from") {
      timeRange[0] = value;
    } else if (field === "to") {
      timeRange[1] = value;
    }
    updatedDayTimes[index] = timeRange.join(" ");
    setDayTimes(updatedDayTimes);
  };

  const handleNightTimeChange = (value, index, field) => {
    const updatedNightTimes = [...nightTimes];
    const timeRange = updatedNightTimes[index].split(" ");
    if (field === "from") {
      timeRange[0] = value;
    } else if (field === "to") {
      timeRange[1] = value;
    }
    updatedNightTimes[index] = timeRange.join(" ");
    setNightTimes(updatedNightTimes);
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
            {error && <Alert variant="danger">{error}</Alert>}
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
              {slots.includes("day") && (
                <div>
                  <Form.Group>
                    <Form.Label>Day Slots:</Form.Label>
                    {dayTimes.map((timeRange, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-center"
                      >
                        <Form.Control
                          type="time"
                          value={timeRange.split(" ")[0]}
                          onChange={(e) =>
                            handleDayTimeChange(e.target.value, index, "from")
                          }
                        />
                        <span> to </span>
                        <Form.Control
                          type="time"
                          value={timeRange.split(" ")[1]}
                          onChange={(e) =>
                            handleDayTimeChange(e.target.value, index, "to")
                          }
                        />
                      </div>
                    ))}
                    {console.log(dayTimes)}
                    {dayTimes.length < 5 && (
                      <Button
                        variant="outline-secondary"
                        onClick={addDayTimeEntry}
                      >
                        Add
                      </Button>
                    )}
                    {dayTimes.length > 1 && (
                      <Button
                        variant="outline-danger"
                        onClick={removeLastDayTimeEntry}
                      >
                        Remove
                      </Button>
                    )}
                  </Form.Group>
                </div>
              )}

              {slots.includes("night") && (
                <div>
                  <Form.Group>
                    <Form.Label>Night Slots:</Form.Label>
                    {nightTimes.map((timeRange, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-center"
                      >
                        <Form.Control
                          type="time"
                          value={timeRange.split(" ")[0]}
                          onChange={(e) =>
                            handleNightTimeChange(e.target.value, index, "from")
                          }
                        />
                        <span> to </span>
                        <Form.Control
                          type="time"
                          value={timeRange.split(" ")[1]}
                          onChange={(e) =>
                            handleNightTimeChange(e.target.value, index, "to")
                          }
                        />
                      </div>
                    ))}
                    {console.log(nightTimes)}
                    {nightTimes.length < 5 && (
                      <Button
                        variant="outline-secondary"
                        onClick={addNightTimeEntry}
                      >
                        Add
                      </Button>
                    )}
                    {nightTimes.length > 1 && (
                      <Button
                        variant="outline-danger"
                        onClick={removeLastNightTimeEntry}
                      >
                        Remove
                      </Button>
                    )}
                  </Form.Group>
                </div>
              )}

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
