import { useState, useEffect } from "react";
import { CardEmprendimiento } from "../../components";
import { api } from "../../api/api";

export default function FavoritosScreen() {
  const [favoritos, setFavoritos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    api
      .get("/favoritos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setFavoritos(res.data);
        } else {
          console.error("Formato inesperado: ", res.data);
        }
      })
      .catch((err) => {
        console.error("Error al obtener favoritos: ", err);
      });
  }, []);

  return (
    <>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#2C4692] m-2 p-2 text-center">
          Favoritos
        </h1>
        <div className="ml-7 mr-7 mb-6">
          <p className=" text-gray-600 text-center">
            Aqui apareceran tus emprendimientos favoritos.
          </p>
          <div className="absolute left-0 right-0 border-b border-[#2C4692] pt-4"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 p-6">
        {favoritos.length > 0 ? (
          favoritos.map((item) => (
            <CardEmprendimiento
              key={item.emprendimiento.id}
              id={item.emprendimiento.id}
              nombre={item.emprendimiento.nombre}
              descripcion={item.emprendimiento.descripcion}
              categoria={item.emprendimiento.Categorias.nombre}
              imagen={item.emprendimiento.imagen}
            />
          ))
        ) : (
          <p className=" text-gray-600 text-center">
            Aún no tienes emprendimientos marcados como favoritos. Explora la página principal y añádelos!
          </p>
        )}
      </div>
    </>
  );
}
