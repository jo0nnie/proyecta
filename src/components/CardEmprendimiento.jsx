import { useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

/**
 * Renderiza:
 * - img, boton guardar, nombre, descripcion, categoría

 * Props que recibe:
 * - nombre, descripcion, categoria e imagen
 */
export default function CardEmprendimiento({ nombre, descripcion, categoria, imagen }) {
  const [guardado, setGuardado] = useState(false);

  const toggleGuardado = () => {
    setGuardado(!guardado);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden w-80">
      <div className="relative h-48 w-full">
        <img
          src={imagen}
          alt={nombre}
          className="object-cover h-full w-full"
        />
        <button
          onClick={toggleGuardado}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-xl text-gray-600 hover:text-blue-600"
        >
          {guardado ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{nombre}</h3>
        <p className="text-sm text-gray-700 mb-3">{descripcion}</p>
        <span className="inline-block text-xs font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          {categoria}
        </span>
      </div>
    </div>
  );
}
