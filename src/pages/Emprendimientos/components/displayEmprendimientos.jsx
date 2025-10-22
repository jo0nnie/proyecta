import { useState, useEffect } from "react";
import CardEmprendimiento from "../../../components/CardEmprendimiento";
import { api } from "../../../api/api";

export default function DisplayEmprendimientos() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [emprendimientos, setEmprendimientos] = useState([]);
  const emprendimientosPorPagina = 12;

  useEffect(() => {
    api
      .get("/emprendimientos")
      .then((res) => {
        if (Array.isArray(res.data.emprendimientos)) {
          setEmprendimientos(res.data.emprendimientos);
        } else {
          console.error("Formato inesperado:", res.data);
        }
      })
      .catch((err) => {
        console.error("Error al obtener emprendimientos:", err);
      });
  }, []);

  const totalPaginas = Math.ceil(
    emprendimientos.length / emprendimientosPorPagina
  );
  const indiceInicio = (paginaActual - 1) * emprendimientosPorPagina;
  const indiceFin = indiceInicio + emprendimientosPorPagina;
  const emprendimientosAMostrar = emprendimientos.slice(
    indiceInicio,
    indiceFin
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* grilla de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-4 md:px-6 lg:px-8 py-6 w-full">
        {emprendimientosAMostrar.map((item) => (
          <CardEmprendimiento
            key={item.id}
            id={item.id}
            nombre={item.nombre}
            descripcion={item.descripcion}
            categoria={item.Categorias?.nombre || "Sin categoría"}
            imagen={item.imagen}
          />
        ))}
      </div>

      {/* botones de paginación */}
      <div className="mt-auto flex justify-center gap-4 py-6">
        <button
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaActual === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          Anterior
        </button>
        <span className="self-center font-medium text-lg">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={() =>
            setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))
          }
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          Siguiente
        </button>
      </div>
    </div>

  );
}
