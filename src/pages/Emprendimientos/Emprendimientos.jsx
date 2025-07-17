import { Navbar, Carrusel } from "../../components";
import Footer from "../../components/Footer/Footer";
import DisplayEmprendimientos from "./displayEmprendimientos";

export default function Emprendimiento() {
  return (
    <>
      <Navbar />
      <div className="mt-2">
        <Carrusel />
      </div>
      <div className="">
        <DisplayEmprendimientos />
      </div>
      <Footer />
    </>
  );
}
