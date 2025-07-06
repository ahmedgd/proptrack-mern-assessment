import { Card } from "react-bootstrap"
import type { Property } from "../../store/propertySlice"
import { NavLink } from "react-router-dom"

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="shadow-sm border-0 rounded-3 h-100">
      <Card.Img
        variant="top"
        src={property.images?.[0] || "https://via.placeholder.com/400x250"}
        alt={property.title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="fw-bold">{property.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {property.location}
        </Card.Subtitle>
        <Card.Text className="fs-5 fw-semibold text-primary">
          {property.price.toLocaleString()}
        </Card.Text>
        <NavLink
          to={`/property/${property._id}`}
          className="btn btn-outline-primary btn-sm"
        >
          View Details
        </NavLink>
      </Card.Body>
    </Card>
  )
}
