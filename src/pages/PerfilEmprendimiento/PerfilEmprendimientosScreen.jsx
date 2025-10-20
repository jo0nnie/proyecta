import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import PerfilEmprendimiento from "./components/PerfilEmprendimiento";

const PerfilEmprendimientosScreen = () => {
  const { id } = useParams();
  const [emprendimiento, setEmprendimiento] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/emprendimientos/${id}`)
      .then((res) => {
        const datos = res.data.emprendimiento;

        const datosEmprendimiento = {
          nombre: datos.nombre,
          imagen: datos.imagen,
          descripcion: datos.descripcion,
          categoria: datos.Categorias?.nombre || "Sin categoría",
          resumen: datos.resumen || "", 
          correo: datos.Usuarios?.email || "", 
          fotos: datos.fotos || [], 
        };

        setEmprendimiento(datosEmprendimiento);
      })
      .catch((err) => {
        console.error("Error al obtener emprendimiento:", err);
        setError("No se encontró el emprendimiento.");
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!emprendimiento) return <p>Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-1">
      <PerfilEmprendimiento emprendimiento={emprendimiento} />
    </div>
  );
};

export default PerfilEmprendimientosScreen;