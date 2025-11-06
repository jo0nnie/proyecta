import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { MdRocketLaunch } from "react-icons/md";
import { Badge } from "./Badge";
import { useNavigate } from "react-router";
import { api } from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toggleFavorito } from "../store/slice/favoritosSlice";
import { useHistorial } from "../hooks/useHistorial";
import { BoostBadge } from "./BoostBadge";
export default function CardEmprendimiento({
  nombre,
  descripcion,
  categoria,
  imagen,
  id,
  estaBoosted,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const favoritos = useSelector((state) => state.favoritos.lista);
  const navigate = useNavigate()
  const { registrarVisita } = useHistorial();
  const favoritosSeguros = Array.isArray(favoritos) ? favoritos : [];
  const guardado = favoritosSeguros.some(
    (item) => item.emprendimientoId === id || item.emprendimiento?.id === id
  );

  const handleToggleFavorito = async (e) => {
    e.stopPropagation();

    if (!token) {
      toast.error("Debes iniciar sesión para guardar favoritos");
      return;
    }

    try {
      const res = await api.post(
        "/favoritos/toggle",
        { emprendimientoId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.favorito) {
        dispatch(toggleFavorito(res.data.favorito));
      } else {
        dispatch(toggleFavorito({ emprendimientoId: id }));
      }

    } catch (err) {
      console.error("Error al alternar favorito:", err);
      toast.error("No se pudo actualizar el favorito");
    }
  };
  const handleClickCard = async () => {
    console.log("Click en card:", id);
    if (token) await registrarVisita(id);
    navigate(`/emprendimientos/${id}`);
  };
  // const toggleHistorial = async () => {
  //   if (!token) return;
  //   try {
  //     await api.post(
  //       "/historial",
  //       { emprendimientoId: id },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //   } catch (err) {
  //     console.error("Error al registrar historial:", err);
  //   }
  // };

  return (
    <div
      onClick={handleClickCard}
      className="block cursor-pointer"
    >
      <div className="relative bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[360px] h-[360px] flex flex-col transform transition duration-300 ease-in-out hover:scale-101 hover:shadow-lg mb-3">
        {/* Imagen */}
        <div className="relative h-48 w-full shrink-0">
          <img
            src={imagen}
            alt={nombre}
            className="object-cover h-full w-full"
          />
          {estaBoosted && (
            <div
              className="absolute top-2 left-2 px-3 py-1 rounded-full text-white text-xs font-semibold shadow-md bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 flex items-center gap-1"
              title="Boost activo"
            >
              <MdRocketLaunch className="text-white text-base" />
              Boosted
            </div>
          )}
          {token && (
            <button
              onClick={handleToggleFavorito}
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-xl text-gray-600 hover:text-blue-600"
              aria-label={guardado ? "Quitar de favoritos" : "Añadir a favoritos"}
            >
              {guardado ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          )}
        </div>

        {/* Contenido */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-2">
            <h3 className="text-xl font-semibold mb-1">{nombre}</h3>
            <p className="text-sm text-gray-700 line-clamp-3">{descripcion}</p>
          </div>
          <div className="mt-auto flex flex-wrap gap-2 items-center">
            <Badge text={categoria} />
          </div>
        </div>
      </div>
    </div>
  );
}