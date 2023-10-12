import { Card, Button } from "react-bootstrap";

export const Booking = ({ booking }) => {
  return (
    <div className="p-1">
      <Card>
        <Card.Header as="h5">Turf: {booking.turfName}</Card.Header>
        <Card.Body>
          <Card.Title>{booking.date}</Card.Title>
          <Card.Text>{booking.time}</Card.Text>
          <Card.Text>Slots:</Card.Text>
          <Card.Text>
            {booking.dayTime && <Card.Text>{booking.dayTime}</Card.Text>}
            {booking.nightTime && <Card.Text>{booking.nightTime}</Card.Text>}
          </Card.Text>
          <Button variant="outline-danger">Delete Booking</Button>
        </Card.Body>
      </Card>
    </div>
  );
};
