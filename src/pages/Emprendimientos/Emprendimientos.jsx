import { Navbar, Carrusel } from "../../components";
import Footer from "../../components/Footer/Footer";
import DisplayEmprendimientos from "./displayEmprendimientos";

export default function Emprendimiento() {
  return (
    <>
      <Navbar />
      <div className="mt-6">
        <Carrusel />
      </div>
      <div className="-mt-6">
        <DisplayEmprendimientos />
      </div>
      <Footer />
    </>
  );
}
