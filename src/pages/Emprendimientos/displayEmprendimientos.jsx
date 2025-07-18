import { useState } from "react";
import CardEmprendimiento from "../../components/CardEmprendimiento";
import emprendimientos from "../../utils/emprendimientoMock.json";

export default function DisplayEmprendimientos() {
    const [paginaActual, setPaginaActual] = useState(1);
    const emprendimientosPorPagina = 12;

    const totalPaginas = Math.ceil(emprendimientos.length / emprendimientosPorPagina);
    const indiceInicio = (paginaActual - 1) * emprendimientosPorPagina;
    const indiceFin = indiceInicio + emprendimientosPorPagina;
    const emprendimientosAMostrar = emprendimientos.slice(indiceInicio, indiceFin);

    return (
        <div className="flex flex-col justify-items-center min-h-screen p-1 bg-white">
            {/* grilla de tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 -px-8 py-6 max-w-7xl mx-auto justify-items-center">
                {emprendimientosAMostrar.map((item) => (
                    <CardEmprendimiento
                        key={item.id}
                        id={item.id}
                        nombre={item.nombre}
                        descripcion={item.descripcion}
                        categoria={item.categoria}
                        imagen={item.imagen}
                    />
                ))}
            </div>

            {/* botones de paginación */}
            <div className="flex justify-center mt-5 gap-4">
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
                    onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
                    disabled={paginaActual === totalPaginas}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
