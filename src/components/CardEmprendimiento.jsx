import { useState, useEffect } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Badge } from "./Badge";
import { Link } from "react-router-dom";

export default function CardEmprendimiento({ nombre, descripcion, categoria, imagen, id, boosted }) {
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
      <div className="relative bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[360px] h-[360px] flex flex-col transform transition duration-300 ease-in-out hover:scale-101 hover:shadow-lg mb-3">

        {/* Imagen */}
        <div className="relative h-48 w-full shrink-0">
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

        {/* Contenido */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-2">
            <h3 className="text-xl font-semibold mb-1">{nombre}</h3>
            {boosted && <Badgeboost />}
            <p className="text-sm text-gray-700 line-clamp-3">{descripcion}</p>
          </div>

          <div className="mt-auto">
            <Badge text={categoria} />
          </div>
        </div>

      </div>
    </Link>
  );
}
