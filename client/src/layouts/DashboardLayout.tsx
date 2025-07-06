import { Outlet } from "react-router-dom";
import NavbarDashboard from "../components/Shared/NavbarDashboard";

export default function DashboardLayout() {
  return (
    <>
      <NavbarDashboard />
      <Outlet />
    </>
  );
}
