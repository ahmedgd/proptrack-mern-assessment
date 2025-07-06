import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchProperties } from "../../store/propertySlice";
import { fetchClients } from "../../store/clientSlice";
import { createViewing } from "../../store/viewingSlice";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AddViewing() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { properties, loading: propertiesLoading } = useSelector((state: RootState) => state.property);
  const { clients, loading: clientsLoading } = useSelector((state: RootState) => state.client);
  const { loading: viewingsLoading } = useSelector((state: RootState) => state.viewing);

  const [propertyId, setPropertyId] = useState("");
  const [clientId, setClientId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchProperties());
    dispatch(fetchClients());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createViewing({
      propertyId,
      clientId,
      date,
      time,
      status: "scheduled",
      notes
    }));
    setSubmitted(true);
    setTimeout(() => {
      navigate("/dashboard/viewings");
    }, 1500);
  };

  if (propertiesLoading || clientsLoading || viewingsLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="fw-bold mb-4">New Viewing Request</h2>
      {submitted && (
        <Alert variant="success">Viewing created successfully, redirecting…</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Property</Form.Label>
          <Form.Select required value={propertyId} onChange={e => setPropertyId(e.target.value)}>
            <option value="">Select property</option>
            {properties.map(p => (
              <option key={p._id} value={p._id}>{p.title}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Client</Form.Label>
          <Form.Select required value={clientId} onChange={e => setClientId(e.target.value)}>
            <option value="">Select client</option>
            {clients.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" required value={date} onChange={e => setDate(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control type="time" required value={time} onChange={e => setTime(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" rows={3} value={notes} onChange={e => setNotes(e.target.value)} />
        </Form.Group>
        <Button type="submit" variant="primary">Add Viewing</Button>
      </Form>
    </Container>
  );
}
