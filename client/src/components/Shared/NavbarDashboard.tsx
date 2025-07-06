import { Navbar, Nav, Container, Button } from "react-bootstrap";

export default function NavbarDashboard() {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="shadow-sm sticky-top py-3"
      style={{ fontWeight: 500 }}
    >
      <Container>
        <Navbar.Brand href="/dashboard" className="fs-4 fw-bold text-warning">
          PropTrack Agent
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="dashboard-navbar" />
        <Navbar.Collapse id="dashboard-navbar">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/dashboard/properties"> Properties</Nav.Link>
            <Nav.Link href="/dashboard/clients">Leads</Nav.Link>
            <Nav.Link href="/dashboard/viewings/add">Viewing</Nav.Link>
            <Nav.Link href="/dashboard/viewings">Bookings</Nav.Link>
            <Button
              href="/dashboard/properties/add"
              variant="warning"
              className="ms-2 px-3 py-1 rounded"
            >
              + Add Property
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
