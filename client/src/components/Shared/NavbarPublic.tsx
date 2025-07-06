import { Navbar, Nav, Container } from "react-bootstrap";

export default function NavbarPublic() {
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
        <Navbar.Toggle aria-controls="public-navbar" />
        <Navbar.Collapse id="public-navbar">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
