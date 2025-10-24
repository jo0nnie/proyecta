import { useState, useEffect } from 'react';
import { CardEmprendimiento } from "../../components";
import emprendimientos from "../../utils/emprendimientoMock.json";

export default function FavoritosScreen() {
  const [favoriteEmprendimientos, setFavoriteEmprendimientos] = useState([]);

  useEffect(() => {
    // obtiene los IDs de los favoritos desde localStorage
    const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];

    // filtra la lista completa de emprendimientos para obtener solo los favoritos
    const filteredEmprendimientos = emprendimientos.filter(item =>
      favoriteIds.includes(item.id) // usamos el 'id' para filtrar
    );

    setFavoriteEmprendimientos(filteredEmprendimientos);

  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-full">
      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#2C4692] m-4 p-4 text-center">
        Favoritos
      </h1>

      {/* Contenido */}
      <div className="flex-1 flex flex-col items-center">
        {favoriteEmprendimientos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6 lg:px-8 py-6 w-full">
            {favoriteEmprendimientos.map((item) => (
              <CardEmprendimiento
                key={item.id}
                id={item.id}
                nombre={item.nombre}
                descripcion={item.descripcion}
                categoria={item.categoria}
                imagen={item.imagen}
              />
            ))}
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
