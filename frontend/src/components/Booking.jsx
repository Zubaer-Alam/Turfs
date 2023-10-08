import { Card , Button } from "react-bootstrap";

export const Booking = ({booking}) => {
  return (
    <Card>
      <Card.Header as="h5">Turf : {booking.turfName}</Card.Header>
      <Card.Body>
        <Card.Title>{booking.date}</Card.Title>
        <Card.Text>
            {booking.time}
        </Card.Text>
        {/* <Button variant="outline-danger">Delete Booking</Button> */}
      </Card.Body>
    </Card>
  );
};
