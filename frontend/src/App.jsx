import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
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
        <Navbar className="sticky-top" bg="primary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand className="fw-bold ">Turf</Navbar.Brand>
            <Navbar.Toggle />
            {user && (
              <Button variant="danger" onClick={handleClick}>
                Logout
              </Button>
            )}
          </Container>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
