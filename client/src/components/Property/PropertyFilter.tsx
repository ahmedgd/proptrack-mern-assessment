import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"

export default function PropertyFilter() {
  const [price, setPrice] = useState("")
  const [type, setType] = useState("")
  const [location, setLocation] = useState("")

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault()
// == Here you would typically dispatch an action to filter properties
    console.log({ price, type, location })
  }

  return (
    <Form onSubmit={handleFilter} className="p-3 shadow-sm bg-light rounded mb-4">
      <Row className="g-2 align-items-end">
        <Col md>
          <Form.Label>Max Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="e.g. 500000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Col>
        <Col md>
          <Form.Label>Type</Form.Label>
          <Form.Select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Any</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="townhouse">Townhouse</option>
          </Form.Select>
        </Col>
        <Col md>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Dubai"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Col>
        <Col md="auto">
          <Button type="submit" variant="primary">
            Filter
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
