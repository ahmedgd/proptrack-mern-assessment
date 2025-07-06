import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { useEffect, useState } from "react";
import { fetchViewings, deleteViewing, updateViewing } from "../../store/viewingSlice";
import { Container, Table, Button, Badge, Spinner, Modal, Form } from "react-bootstrap";

export default function ManageViewings() {
  const dispatch = useDispatch<AppDispatch>();
  const { viewings, loading } = useSelector((state: RootState) => state.viewing);

  const [editViewing, setEditViewing] = useState<typeof viewings[0] | null>(null);
  const [newStatus, setNewStatus] = useState<"scheduled" | "completed" | "cancelled">("scheduled");
  const [newNotes, setNewNotes] = useState("");

  useEffect(() => {
    dispatch(fetchViewings());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="fw-bold mb-4">Booking Calendar</h2>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>Property</th>
            <th>Client</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {viewings.map((v) => (
            <tr key={v._id}>
              <td>
                {typeof v.propertyId === "string"
                  ? v.propertyId
                  : v.propertyId?.title || "—"}
              </td>
              <td>
                {typeof v.clientId === "string"
                  ? v.clientId
                  : v.clientId?.name || "—"}
              </td>
              <td>{v.date}</td>
              <td>{v.time}</td>
              <td>
                <Badge
                  bg={
                    v.status === "scheduled"
                      ? "primary"
                      : v.status === "completed"
                      ? "success"
                      : "secondary"
                  }
                >
                  {v.status}
                </Badge>
              </td>
              <td>{v.notes || "—"}</td>
              <td>
                <Button
                  size="sm"
                  variant="warning"
                  className="me-2"
                  onClick={() => {
                    setEditViewing(v);
                    setNewStatus(v.status);
                    setNewNotes(v.notes || "");
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    if (confirm(`Are you sure to delete viewing ${v._id}?`)) {
                      dispatch(deleteViewing(v._id));
                    }
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {viewings.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-muted">
                No viewings scheduled.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* === edit modal === */}
      <Modal show={!!editViewing} onHide={() => setEditViewing(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Viewing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newStatus}
                onChange={(e) =>
                  setNewStatus(
                    e.target.value as "scheduled" | "completed" | "cancelled"
                  )
                }
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditViewing(null)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (editViewing) {
                dispatch(
                  updateViewing({
                    id: editViewing._id,
                    data: { status: newStatus, notes: newNotes },
                  })
                );
                setEditViewing(null);
              }
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
