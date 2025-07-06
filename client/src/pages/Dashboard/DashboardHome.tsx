import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { useEffect } from "react";
import { fetchProperties } from "../../store/propertySlice";
import { fetchClients } from "../../store/clientSlice";
import { fetchViewings } from "../../store/viewingSlice";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaHome, FaUserPlus, FaCalendarCheck } from "react-icons/fa";

// Chart.js register
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardHome() {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading: propertiesLoading } = useSelector(
    (state: RootState) => state.property
  );
  const { clients, loading: clientsLoading } = useSelector(
    (state: RootState) => state.client
  );
  const { viewings, loading: viewingsLoading } = useSelector(
    (state: RootState) => state.viewing
  );

  useEffect(() => {
    dispatch(fetchProperties());
    dispatch(fetchClients());
    dispatch(fetchViewings());
  }, [dispatch]);

  const loading = propertiesLoading || clientsLoading || viewingsLoading;

  const chartData = {
    labels: ["Properties", "Leads", "Bookings"],
    datasets: [
      {
        label: "Count",
        data: [properties.length, clients.length, viewings.length],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 206, 86, 0.7)",
        ],
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Activity Overview" },
    },
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="fw-bold mb-4">📊 Dashboard Overview</h2>
      <Row className="g-4">
        <Col md={4}>
          <Card className="text-center shadow border-0">
            <Card.Body>
              <FaHome size={30} className="text-primary mb-2" />
              <Card.Title>Total Properties</Card.Title>
              <Card.Text className="display-5 fw-bold text-primary">
                {properties.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow border-0">
            <Card.Body>
              <FaUserPlus size={30} className="text-success mb-2" />
              <Card.Title>New Leads</Card.Title>
              <Card.Text className="display-5 fw-bold text-success">
                {clients.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow border-0">
            <Card.Body>
              <FaCalendarCheck size={30} className="text-warning mb-2" />
              <Card.Title>Upcoming Bookings</Card.Title>
              <Card.Text className="display-5 fw-bold text-warning">
                {viewings.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <Card className="shadow border-0">
            <Card.Body>
              <Bar data={chartData} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
