import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchProperties } from "../../store/propertySlice";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Spinner,
  Card,
  Badge,
  Button,
  Accordion,
} from "react-bootstrap";
import InquiryForm from "./InquiryForm";
import {
  Bed,
  Bath,
  Ruler,
  MapPin,
  Phone,
  Mail,
  Heart,
  Map,
  Share2,
  Video,
} from "lucide-react";

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading } = useSelector((state: RootState) => state.property);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    if (properties.length === 0) dispatch(fetchProperties());
  }, [dispatch, properties.length]);

  const property = properties.find((p) => p._id === id);

  if (loading || !property) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  const description = property.description || "No description available";

  return (
    <Container className="my-4">
      <Row>
        <Col md={8}>
          <div className="position-relative">
            <Image
              src={property.images?.[0] || "https://picsum.photos/800/400?grayscale"}
              fluid
              rounded
              className="mb-3 shadow-sm"
              style={{ objectFit: "cover", height: "400px", width: "100%" }}
            />
            <Badge
              bg="light"
              text="dark"
              className="position-absolute top-0 start-0 m-2 px-2 py-1"
            >
              TruBroker™
            </Badge>
          </div>
          <Row className="g-2 mb-3">
            {property.images?.slice(1, 4).map((img, i) => (
              <Col xs={4} key={i}>
                <Image
                  src={img}
                  fluid
                  rounded
                  style={{ height: "120px", objectFit: "cover" }}
                />
              </Col>
            ))}
          </Row>
          <h3 className="fw-bold mb-2">{property.title}</h3>
          <p className="text-muted mb-1">
            <MapPin size={16} className="me-1" />
            {property.location}
          </p>
          <h4 className="text-primary mb-3">
            AED {property.price.toLocaleString()} Yearly
          </h4>
          <ul className="list-inline text-muted mb-3 d-flex gap-3 flex-wrap">
            <li className="d-flex align-items-center gap-1">
              <Bed size={16} /> {property.bedrooms} Bed
            </li>
            <li className="d-flex align-items-center gap-1">
              <Bath size={16} /> {property.bathrooms} Bath
            </li>
            <li className="d-flex align-items-center gap-1">
              <Ruler size={16} /> {property.area} sqft
            </li>
          </ul>
          <div className="mb-3 d-flex gap-2 flex-wrap">
            <Button variant="outline-secondary" size="sm">
              <Map size={16} /> Map
            </Button>
            <Button variant="outline-secondary" size="sm">
              <Video size={16} /> Video
            </Button>
            <Button variant="outline-secondary" size="sm">
              <Share2 size={16} /> Share
            </Button>
            <Button variant="outline-secondary" size="sm">
              <Heart size={16} /> Save
            </Button>
          </div>
          <Accordion defaultActiveKey="0" className="mb-4">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Description</Accordion.Header>
              <Accordion.Body>
                <p className="small">
                  {showFullDesc || description.length < 200
                    ? description
                    : `${description.slice(0, 200)}...`}
                </p>
                {description.length > 200 && (
                  <Button
                    size="sm"
                    variant="link"
                    className="p-0"
                    onClick={() => setShowFullDesc((prev) => !prev)}
                  >
                    {showFullDesc ? "Read Less" : "Read More"}
                  </Button>
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Features</Accordion.Header>
              <Accordion.Body>
                <ul className="small ps-3 mb-0">
                  {property.amenities && property.amenities.length > 0 ? (
                    property.amenities.map((a) => <li key={a}>{a}</li>)
                  ) : (
                    <li>No features listed</li>
                  )}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Community</Accordion.Header>
              <Accordion.Body>
                <p className="small">
                  Close to schools, hospitals, and public transport in a high-demand area.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

<Card className="shadow-sm border mb-4">
  <Card.Body>
    <h6 className="fw-bold mb-3">Recommended for you</h6>
    <Row className="gx-2 gy-3">
      {properties
        .filter((p) => p._id !== property._id)
        .slice(0, 3)
        .map((rec) => (
          <Col md={4} key={rec._id}>
            <Card className="h-100 shadow-sm border-0" style={{ cursor: "pointer" }} onClick={() => navigate(`/properties/${rec._id}`)}>
              <div className="position-relative">
                <Card.Img
                  src={rec.images?.[0] || "https://via.placeholder.com/400x300"}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <Badge bg="dark" className="position-absolute top-0 start-0 m-2">Checked</Badge>
                <Heart size={16} className="position-absolute top-0 end-0 m-2 text-white" />
              </div>
              <Card.Body>
                <Card.Text className="text-primary fw-bold mb-1">AED {rec.price.toLocaleString()} Yearly</Card.Text>
                <div className="d-flex align-items-center text-muted small mb-1 gap-2 flex-wrap">
                  <span><Bed size={12}/> {rec.bedrooms}</span>
                  <span><Bath size={12}/> {rec.bathrooms}</span>
                  <span><Ruler size={12}/> {rec.area} sqft</span>
                </div>
                <Card.Text className="small text-muted mb-0">
                  {rec.location.length > 40 ? rec.location.slice(0, 40) + "..." : rec.location}
                </Card.Text>
                <Card.Text className="small text-muted mb-0">
                  Trusted Real Estate
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  </Card.Body>
</Card>





        </Col>
        <Col md={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body className="text-center">
              <Image
                src="https://randomuser.me/api/portraits/men/75.jpg"
                roundedCircle
                style={{ width: "80px", height: "80px" }}
                className="mb-2"
              />
              <h6 className="fw-bold mb-0">Ahmad Al Saleh</h6>
              <small className="text-muted">TruBroker™</small>
              <div className="d-flex justify-content-center gap-2 my-3 flex-wrap">
                <Button size="sm" variant="outline-primary">
                  <Phone size={14} /> Call
                </Button>
                <Button size="sm" variant="outline-success">
                  <Mail size={14} /> Email
                </Button>
                <Button size="sm" variant="outline-danger">
                  <Heart size={14} /> Save
                </Button>
              </div>
              <InquiryForm propertyId={property._id} />
            </Card.Body>
          </Card>
          <Card className="shadow-sm border mb-4">
            <Card.Body className="text-center">
              <Image
  src="https://images.pexels.com/photos/6283960/pexels-photo-6283960.jpeg?auto=compress&cs=tinysrgb&w=800"
                fluid
                rounded
              />
            </Card.Body>
          </Card>
          <Card className="shadow-sm border mb-4">
            <Card.Body className="text-center">
              <Image
      src="https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg?auto=compress&cs=tinysrgb&h=800"
                fluid
                rounded
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
