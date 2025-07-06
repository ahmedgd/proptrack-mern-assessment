import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { fetchProperties } from "../../store/propertySlice";
import axios from "axios";

export default function EditProperty() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const property = useSelector((state: RootState) => state.property.properties.find((p) => p._id === id));

  const [formData, setFormData] = useState({
    title: property?.title || "",
    price: property?.price?.toString() || "",
    type: property?.type || "",
    location: property?.location || "",
    bedrooms: property?.bedrooms?.toString() || "",
    bathrooms: property?.bathrooms?.toString() || "",
    area: property?.area?.toString() || "",
    amenities: property?.amenities?.join(", ") || "",
    images: property?.images?.join(", ") || "",
    description: property?.description || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/properties/${id}`, {
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
        amenities: formData.amenities.split(",").map((item) => item.trim()),
        images: formData.images.split(",").map((item) => item.trim()),
      });
      dispatch(fetchProperties());
      alert("Property updated successfully");
      navigate("/dashboard/properties");
    } catch (err) {
      console.error("Error updating property", err);
      alert("Error updating property");
    }
  };

  if (!property) {
    return (
      <Container className="my-5 text-center">
        <h2>Property not found</h2>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="fw-bold mb-4">Edit Property</h2>
      <Form onSubmit={handleSubmit}>
        {/* same fields as AddProperty */}
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={formData.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control name="price" type="number" value={formData.price} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Control name="type" value={formData.type} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control name="location" value={formData.location} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Bedrooms</Form.Label>
          <Form.Control name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Bathrooms</Form.Label>
          <Form.Control name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Area (m²)</Form.Label>
          <Form.Control name="area" type="number" value={formData.area} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Amenities (comma separated)</Form.Label>
          <Form.Control name="amenities" value={formData.amenities} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Images (comma separated URLs)</Form.Label>
          <Form.Control name="images" value={formData.images} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Update Property</Button>
      </Form>
    </Container>
  );
}