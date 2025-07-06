import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import type { Property } from "../../store/propertySlice";
import { Container, Row, Col, Card, Button, Spinner, Form, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProperties } from "../../store/propertySlice";
import "animate.css";
import { MapPin, Bed, Bath, Ruler, Mail, Phone, MessageCircle } from "lucide-react";

export default function PropertyList() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { properties, loading } = useSelector((state: RootState) => state.property);

  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const filtered = properties.filter((p) => {
    const okPrice = !maxPrice || p.price <= maxPrice;
    const okType = !selectedType || p.type === selectedType;
    const okLoc = !selectedLocation || p.location?.toLowerCase().includes(selectedLocation.toLowerCase());
    return okPrice && okType && okLoc;
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1,
          }}
        />
        <div
          style={{ zIndex: 2, textAlign: "center" }}
          className="animate__animated animate__fadeInDown"
        >
          <h1 className="fw-bold display-4 mb-3">Find Your Dream Home</h1>
          <p className="lead mb-4">Rent it. Sell it. Love Where You Start</p>
        
        </div>
      </section>

      {/* Filter */}
      <Container className="my-5">
        <Card className="shadow-sm p-4">
          <h5 className="mb-3 fw-bold">Filter Your Search</h5>
          <Form className="row gy-3 align-items-end">
            <Form.Group className="col-md-3">
              <Form.Label>Max Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g. 500,000"
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="col-md-3">
              <Form.Label>Type</Form.Label>
              <Form.Select onChange={(e) => setSelectedType(e.target.value)}>
                <option value="">Any</option>
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                placeholder="e.g. Dubai Marina"
                onChange={(e) => setSelectedLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="col-md-3 d-grid">
              <Button variant="primary">Search</Button>
            </Form.Group>
          </Form>
        </Card>
      </Container>

      {/* Grid */}
      <Container id="listings" className="my-5">
        <Row className="g-4">
          {filtered.map((prop: Property) => (
            <Col key={prop._id} md={4}>
              <Card className="shadow border-0 h-100 animate__animated animate__fadeInUp">
                <Card.Img
                  variant="top"
                  src={prop.images?.[0] || "https://via.placeholder.com/400x300"}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge bg="success">{prop.type.toUpperCase()}</Badge>
                    <span className="fs-5 text-primary fw-bold">
                      AED {prop.price.toLocaleString()}
                    </span>
                  </div>
                  <Card.Title>{prop.title}</Card.Title>
                  <Card.Text className="small text-muted mb-2">
                    {prop.location}
                  </Card.Text>
                  <ul className="list-inline text-muted mb-3 d-flex gap-3">
                    <li className="d-flex align-items-center gap-1">
                      <Bed size={16} /> {prop.bedrooms}
                    </li>
                    <li className="d-flex align-items-center gap-1">
                      <Bath size={16} /> {prop.bathrooms}
                    </li>
                    <li className="d-flex align-items-center gap-1">
                      <Ruler size={16} /> {prop.area} m²
                    </li>
                  </ul>
                  <div className="d-flex gap-2 mt-2 flex-wrap">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/properties/${prop._id}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="d-flex align-items-center gap-1"
                      onClick={() => {
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            prop.location
                          )}`,
                          "_blank"
                        );
                      }}
                    >
                      <MapPin size={16} />
                      Map
                    </Button>
                    {/* fake contact buttons */}
                    <Button size="sm" variant="outline-success">
                      <Mail size={16} />
                    </Button>
                    <Button size="sm" variant="outline-dark">
                      <Phone size={16} />
                    </Button>
                    <Button size="sm" variant="outline-success">
                      <MessageCircle size={16} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {filtered.length === 0 && (
          <p className="text-center text-muted mt-4">No properties found matching your filters.</p>
        )}
      </Container>
    </div>
  );
}
