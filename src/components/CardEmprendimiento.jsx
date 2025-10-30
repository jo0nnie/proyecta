import { useState, useEffect } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Badge } from "./Badge";
import { Link } from "react-router-dom";
import { api } from "../api/api";

/**
 * Renderiza:
 * - img, botón guardar, nombre, descripción, categoría
 * Props:
 * - nombre, descripcion, categoria, imagen, id
 */
export default function CardEmprendimiento({
  nombre,
  descripcion,
  categoria,
  imagen,
  id,
}) {
  const [guardado, setGuardado] = useState(false);
  const [favoritoId, setFavoritoId] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    api
      .get("/favoritos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Favoritos recibidos:", res.data);
        if (Array.isArray(res.data)) {
          const favorito = res.data.find((fav) => fav.emprendimiento.id === id);
          if (favorito) {
            setGuardado(true);
            setFavoritoId(favorito.id); // ← nuevo estado
          }
        }
      })
      .catch((err) => {
        console.error("Error al obtener favoritos: ", err);
      });
  }, [id]);

  const toggleGuardado = async (e) => {
    e.preventDefault();

    try {
      if (guardado) {
        await api.delete(`/favoritos/${favoritoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await api.post(
          "/favoritos",
          { emprendimientoId: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setGuardado(!guardado);
    } catch (err) {
      console.error("Error al actualizar favorito: ", err);
    }
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
