import { Outlet } from "react-router-dom";
import NavBar from "../../NavBar";
import Footer from "../../Footer/Footer";
import Container from "../../Container";
export default function MainLayout() {
  return (
    //se aplica flex-col para apilar el contenido del layout en columnas y asi resolver el problema del footer en algunas paginas
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <Container className="flex-1">
        <Outlet />
      </Container>
      <Footer />
    </div>

  );
}
