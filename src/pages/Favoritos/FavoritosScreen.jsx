import { useSelector } from "react-redux";
import { CardEmprendimiento } from "../../components";

export default function FavoritosScreen() {
  const favoritos = useSelector((state) => state.favoritos.lista || []);

  return (
    <div className="flex flex-col flex-1 min-h-full">
      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#2C4692] m-4 p-4 text-center">
        Favoritos
      </h1>

      {/* Contenido */}
      <div className="flex-1 flex flex-col items-center">
        {favoritos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6 lg:px-8 py-6 w-full">
            {favoritos.map((item) => {
              const emp = item.emprendimiento || item; // por si guardás solo el objeto o { emprendimiento }
              return (
                <CardEmprendimiento
                  key={emp.id}
                  id={emp.id}
                  nombre={emp.nombre}
                  descripcion={emp.descripcion}
                  categoria={emp.categorias}
                  imagen={emp.imagen}
                />
              );
            })}
          </div>
        ) : (
          <p className="p-6 text-gray-600 text-center">
            Aún no tienes emprendimientos marcados como favoritos. Explora la página principal y añádelos!
          </p>
        )}
      </div>
    </div>
  );
}