import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import PropertyList from "./pages/Public/PropertyList";
import PropertyDetails from "./pages/Public/PropertyDetails";
import About from "./pages/Public/About";
import Contact from "./pages/Public/Contact";

import DashboardHome from "./pages/Dashboard/DashboardHome";
import ManageProperties from "./pages/Dashboard/ManageProperties";
import ManageClients from "./pages/Dashboard/ManageClients";
import ManageViewings from "./pages/Dashboard/ManageViewings";
import AddProperty from "./pages/Dashboard/AddProperty";
import EditProperty from "./pages/Dashboard/EditProperty";
import AddViewing from "./pages/Dashboard/AddViewing";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<PropertyList />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
      </Route>

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="" element={<DashboardHome />} />
        <Route path="properties" element={<ManageProperties />} />
        <Route path="properties/add" element={<AddProperty />} />
        <Route path="properties/:id" element={<EditProperty />} />
        <Route path="clients" element={<ManageClients />} />
        <Route path="viewings" element={<ManageViewings />} />
        <Route path="viewings/add" element={<AddViewing />} />

      </Route>
    </Routes>
  );
}
