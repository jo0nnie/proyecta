import { useState, useEffect } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Badge } from "./Badge";
import { Link } from "react-router-dom"; 

/**
 * Renderiza:
 * - img, botón guardar, nombre, descripción, categoría
 * Props:
 * - nombre, descripcion, categoria, imagen, id
 */
export default function CardEmprendimiento({ nombre, descripcion, categoria, imagen, id }) {
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setGuardado(favorites.includes(id));
  }, [id]);


  const toggleGuardado = (e) => {
    e.preventDefault(); 

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (guardado) {
      favorites = favorites.filter(favId => favId !== id);
    } else {
      favorites.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    setGuardado(!guardado);
  };

  return (
    <Link to={`/emprendimientos/${id}`} className="block"> 
      <div className="relative bg-white rounded-2xl shadow-md overflow-hidden w-80 transform transition duration-300 ease-in-out hover:scale-101 hover:shadow-lg">
        <div className="relative h-48 w-full">
          <img
            src={imagen}
            alt={nombre}
            className="object-cover h-full w-full"
          />
          <button
            onClick={toggleGuardado}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-xl text-gray-600 hover:text-blue-600"
            aria-label={guardado ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            {guardado ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold mb-1">{nombre}</h3>
          <p className="text-sm text-gray-700 mb-3">{descripcion}</p>
          <Badge text={categoria} />
        </div>
      </div>
    </Link>
  );
}
