import { useState } from "react";
import CardEmprendimiento from "../../../components/CardEmprendimiento";
import { useEmprendimientos } from "../../../hooks/useEmprendimientos";
import { Button } from "../../../components";
import { useLocation } from "react-router";
export default function DisplayEmprendimientos() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("buscar") || "";

  const { emprendimientos, loading } = useEmprendimientos(searchTerm);
  const [paginaActual, setPaginaActual] = useState(1);
  const emprendimientosPorPagina = 12;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-6 lg:px-8 py-6 w-full">
        {loading ? (
          <p className="text-center col-span-full">
            Cargando emprendimientos...
          </p>
        ) : emprendimientosAMostrar.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No se encontraron resultados para “{searchTerm}”
          </p>
        ) : (
          emprendimientosAMostrar.map((item) => (
            <CardEmprendimiento
              key={item.id}
              id={item.id}
              nombre={item.nombre}
              descripcion={item.descripcion}
              categoria={item.Categorias?.nombre || "Sin categoría"}
              imagen={item.imagen}
            />
          ))
        )}
      </div>

      <div className="mt-auto flex justify-center gap-4 py-6">
        <Button
          type="button"
          text="Anterior"
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
          variante="dark"
          disabled={paginaActual === 1}
        />
        <span className="self-center font-medium text-lg">
          Página {paginaActual} de {totalPaginas}
        </span>
        <Button
          type="button"
          text="Siguiente"
          onClick={() =>
            setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))
          }
          variante="dark"
          disabled={paginaActual === totalPaginas}
        />
      </div>
    </div>
  );
}
