import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Navbar, Container, Button } from "react-bootstrap";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand className="fw-bold">Turf</Navbar.Brand>
            <Navbar.Toggle />
            {user && (
              <Button variant="danger" onClick={handleClick}>
                Logout
              </Button>
            )}
          </Container>
        </Navbar>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
