import { useDispatch, useSelector } from "react-redux";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { PiUserCircleFill } from "react-icons/pi";
import { Badge } from "../../../components/Badge";
import { BoostBadge } from "../../../components/BoostBadge";
import { toggleFavorito } from "../../../store/slice/favoritosSlice";
import { toast } from "react-toastify";
import { api } from "../../../api/api";

const PerfilEmprendimiento = ({ emprendimiento }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const favoritos = useSelector((state) => state.favoritos.lista);

  const {
    id,
    nombre,
    categoria,
    imagen,
    descripcion,
    boostActivo, // ← asegurate que venga desde el backend
  } = emprendimiento;

  const favoritosSeguros = Array.isArray(favoritos) ? favoritos : [];
  const guardado = favoritosSeguros.some(
    (item) => item.emprendimientoId === id || item.emprendimiento?.id === id
  );

  const handleToggleFavorito = async () => {
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
      console.error("Error al alternar favorito:", err.response?.data || err);
      toast.error("No se pudo actualizar el favorito");
    }
  };

  return (
    <div className="p-8 mx-auto mt-8 rounded-lg max-w-4xl bg-white shadow">
      <div className="flex justify-between items-start gap-8">
        <div className="flex gap-6 items-start">
          {imagen ? (
            <img
              src={imagen}
              alt={nombre}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <PiUserCircleFill className="w-24 h-24 rounded-full p-2" />
          )}
          <div>
            <h1 className="text-4xl font-semibold">{nombre}</h1>
            <div className="mt-2 flex gap-2 items-center">
              <Badge text={categoria} />
              {boostActivo && <BoostBadge />}
            </div>
          </div>
        </div>

        {token && (
          <div className="text-right">
            <button
              onClick={handleToggleFavorito}
              className="bg-white p-2 rounded-full shadow-md text-xl text-gray-600 hover:text-blue-600"
              aria-label={guardado ? "Quitar de favoritos" : "Añadir a favoritos"}
            >
              {guardado ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-[#2B4590] pt-4">
        <h2 className="text-[#2B4590] font-bold mb-4">Descripción</h2>
        <p className="text-gray-700 whitespace-pre-line mb-6">{descripcion}</p>
        {imagen && (
          <img
            src={imagen}
            alt={`imagen-${nombre}`}
            className="w-80 max-w-md mx-auto"
          />
        )}
      </div>
    </div>
  );
};

export default PerfilEmprendimiento;