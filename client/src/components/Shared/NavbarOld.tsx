import { Navbar, Nav, Container, Button } from "react-bootstrap"

export default function AppNavbar() {
  return (
    <Navbar
      bg="light"
      expand="lg"
      className="shadow-sm sticky-top py-3"
      style={{ fontWeight: 500 }}
    >
      <Container>
        <Navbar.Brand href="/" className="fs-4 fw-bold text-primary">
          PropTrack
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/dashboard/properties">Manage Properties</Nav.Link>
            <Nav.Link href="/dashboard/clients">Manage Clients</Nav.Link>
            <Nav.Link href="/dashboard/viewings">Manage Viewings</Nav.Link>
            <Button
              href="/dashboard/properties/add"
              variant="primary"
              className="ms-2 px-3 py-1 rounded"
            >
              Post Property
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
