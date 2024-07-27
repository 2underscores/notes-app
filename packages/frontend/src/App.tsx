import {Navbar, Nav} from "react-bootstrap";
// import Nav from "react-bootstrap/Nav"; // Can also import like this
import Routes from "./Routes.tsx";
import "./App.css";


//  Bootstrap spacing utility (like mb-# -margin bottom and py-# padding vertical (y))

function App() {
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
        <Navbar.Brand className="fw-bold text-muted">Scratch</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="/signup">Signup</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;