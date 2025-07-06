import { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store"
import { fetchProperties } from "../../store/propertySlice"

export default function AddProperty() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    type: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    amenities: "",
    images: "",
    description: "",
  })

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          archived: false, // always send archived false
          price: Number(formData.price),
          bedrooms: Number(formData.bedrooms),
          bathrooms: Number(formData.bathrooms),
          area: Number(formData.area),
          amenities: formData.amenities.split(",").map((item) => item.trim()),
          images: formData.images.split(",").map((item) => item.trim()),
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to submit property")
      }

      await res.json()
      alert("Property submitted successfully!")
      dispatch(fetchProperties()) 
      navigate("/dashboard/properties") 
    } catch (err) {
      console.error("Error submitting property", err)
      alert("Error submitting property, check console")
    }
  }

  return (
    <Container className="mt-4">
      <h2 className="fw-bold mb-4">Add New Property</h2>
      <Form onSubmit={handleSubmit}>
        {/* form groups stay the same as before */}
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select type</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Bedrooms</Form.Label>
          <Form.Control
            name="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Bathrooms</Form.Label>
          <Form.Control
            name="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Area (m²)</Form.Label>
          <Form.Control
            name="area"
            type="number"
            value={formData.area}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Amenities (comma separated)</Form.Label>
          <Form.Control
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Images (comma separated URLs)</Form.Label>
          <Form.Control
            name="images"
            value={formData.images}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Property
        </Button>
      </Form>
    </Container>
  )
}