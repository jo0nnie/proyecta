import React from "react";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer/Footer";
import PerfilEmprendimiento from "../../../components/PerfilEmprendimiento";
import datosMock from "../../../utils/perfilemprendiemientoMock.json";
import { useParams } from "react-router-dom";

const PerfilEmprendimientosScreen = () => {
  // obtiene el ID del emprendimiento desde la URL
  const { id } = useParams();

  // busca el emprendimiento con el ID en eñ mock
  const emprendimiento = datosMock.find(e => e.id === id);

  if (!emprendimiento) return <p>No se encontró el emprendimiento.</p>;

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-50 p-1">
        {/* perfil del emprendimiento */}
        <PerfilEmprendimiento emprendimiento={emprendimiento} />
      </div>

      <Footer />
    </>
  );
};

export default PerfilEmprendimientosScreen;
