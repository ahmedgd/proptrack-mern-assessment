import { Container } from "react-bootstrap"

export default function AppFooter() {
  return (
    <footer
      style={{
        backgroundColor: "#212529",
        color: "white",
        padding: "30px 0",
      }}
    >
      <Container className="text-center">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} PropTrack. All rights reserved.
        </p>
        <p className="small text-muted mb-0">
          Designed for property enthusiasts
        </p>
      </Container>
    </footer>
  )
}
