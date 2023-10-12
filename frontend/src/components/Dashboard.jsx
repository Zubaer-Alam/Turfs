import { Tabs, Tab } from "react-bootstrap";
import BookTurf from "./BookTurf";
import CreateTurf from "./CreateTurf";
import { useAuthContext } from "../hooks/useAuthContext";

const Dashboard = () => {
  return (
    <Tabs
      defaultActiveKey="book"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="book" title="Book">
        {/* <BookTurf /> */}
      </Tab>
      <Tab eventKey="create" title="Create">
        <CreateTurf />
      </Tab>
    </Tabs>
  );
};
export default Dashboard;
