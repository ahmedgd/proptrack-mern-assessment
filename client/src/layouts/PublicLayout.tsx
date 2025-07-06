import { Outlet } from "react-router-dom";
import NavbarPublic from "../components/Shared/NavbarPublic";
import Footer from "../components/Shared/Footer";

export default function PublicLayout() {
  return (
    <>
      <NavbarPublic />
      <Outlet />
      <Footer />
    </>
  );
}
