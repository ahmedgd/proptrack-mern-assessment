import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { Container, Table, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchProperties } from "../../store/propertySlice";
import axios from "axios";

export default function ManageProperties() {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading, error } = useSelector((state: RootState) => state.property);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await axios.delete(`/api/properties/${id}`);
      dispatch(fetchProperties());
      alert("Property deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete property");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 fw-bold">Manage Properties</h2>
      <Link to="/dashboard/properties/add" className="btn btn-primary mb-3">
        + Add New Property
      </Link>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Type</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop) => (
            <tr key={prop._id}>
              <td>{prop.title}</td>
              <td>AED {prop.price.toLocaleString()}</td>
              <td>{prop.type}</td>
              <td>{prop.location}</td>
              <td>
                <Badge bg={prop.archived ? "secondary" : "success"}>
                  {prop.archived ? "Archived" : "Active"}
                </Badge>
              </td>
              <td>
                <Link to={`/dashboard/properties/${prop._id}`} className="btn btn-warning btn-sm me-2">
                  Edit
                </Link>
                <Button size="sm" variant="danger" onClick={() => handleDelete(prop._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
