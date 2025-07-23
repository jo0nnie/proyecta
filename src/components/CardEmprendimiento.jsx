import React, { useState, useEffect } from "react"; // Importa useEffect
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Badge } from "./Badge";

/**
 * Renderiza:
 * - img, boton guardar, nombre, descripcion, categoría

 * Props que recibe:
 * - nombre, descripcion, categoria, imagen, y AHORA TAMBIÉN 'id'
 */
export default function CardEmprendimiento({ nombre, descripcion, categoria, imagen, id }) {
  const [guardado, setGuardado] = useState(false);

  // useEffect para cargar el estado de guardado desde localStorage al montar el componente
  useEffect(() => {
    // obtiene los IDs de los favoritos desde localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // verifica si el ID de este emprendimiento está en la lista de favoritos y actualizar el estado
    setGuardado(favorites.includes(id));
  }, [id]); //se vuelve a ejecutar si el 'id' cambia

  //función para cambiar el estado de guardado y actualizar localStorage
  const toggleGuardado = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (guardado) {
      // si ya estaba guardado, se elimina de la lista
      favorites = favorites.filter(favId => favId !== id);
    } else {
      // si no estaba guardado, se añade
      favorites.push(id);
    }

    // guardar la lista en localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // actualizar el estado para que el icono cambie
    setGuardado(!guardado);
  };

  return (
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
          aria-label={guardado ? "Quitar de favoritos" : "Añadir a favoritos"} // Buena práctica de accesibilidad
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
  );
}