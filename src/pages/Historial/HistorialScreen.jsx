import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { CardEmprendimiento, Button } from "../../components";

export default function HistorialScreen() {
  const [recientes, setRecientes] = useState([]);

  useEffect(() => {
    api
      .get("/historial")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setRecientes(res.data);
        } else {
          console.error("Formato inesperado: ", res.data);
        }
      })
      .catch((err) => {
        console.error("Error al obtener los emprendimientos ", err);
      });
  }, []);

  return (
    <>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#2C4692] m-2 p-2 text-center">
          Historial
        </h1>
        <div className="ml-7 mr-7 mb-6">
          <p className=" text-gray-600 text-center">
            Emprendimientos que has visitado recientemente.
          </p>
          <div className="absolute left-0 right-0 border-b border-[#2C4692] pt-4"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 p-6">
        {recientes.length > 0 ? (
          recientes.map((item) => (
            <CardEmprendimiento
              key={item.emprendimientos.id}
              id={item.emprendimientos.id}
              nombre={item.emprendimientos.nombre}
              descripcion={item.emprendimientos.descripcion}
              categoria={item.emprendimientos.Categorias.nombre}
              imagen={item.emprendimientos.imagen}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
