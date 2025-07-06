import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { useEffect, useState } from "react";
import {
  fetchClients,
  deleteClient,
  updateClientStatus,
} from "../../store/clientSlice";
import { Container, Table, Button, Badge, Form } from "react-bootstrap";

export default function ManageClients() {
  const dispatch = useDispatch<AppDispatch>();
  const clients = useSelector((state: RootState) => state.client.clients);
  const loading = useSelector((state: RootState) => state.client.loading);

  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      dispatch(deleteClient(id));
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    dispatch(updateClientStatus({ id, status: newStatus }));
  };

  const filteredClients =
    filterStatus === "all"
      ? clients
      : clients.filter((c) => c.status === filterStatus);

  return (
    <Container className="my-5">
      <h2 className="mb-4 fw-bold">Leads Management</h2>

      <Form.Select
        className="mb-4"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        style={{ maxWidth: "300px" }}
      >
        <option value="all">All Statuses</option>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="follow-up">Follow-up</option>
        <option value="closed">Closed</option>
      </Form.Select>

      {loading ? (
        <p>Loading leads...</p>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Budget</th>
              <th>Interested Properties</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>
                  {client.budget ? `AED ${client.budget.toLocaleString()}` : "—"}
                </td>
                <td>
                  <Badge bg="info">
                    {client.interestedProperties?.length || 0}
                  </Badge>
                </td>
                <td>
                  <Form.Select
                    size="sm"
                    value={client.status}
                    onChange={(e) =>
                      handleStatusChange(client._id, e.target.value)
                    }
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="closed">Closed</option>
                  </Form.Select>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(client._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
