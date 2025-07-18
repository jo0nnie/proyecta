import React, { useState, useEffect } from 'react';
import { Navbar, CardEmprendimiento } from "../../components";
import emprendimientos from "../../utils/emprendimientoMock.json";

export default function Favoritos() {
  const [favoriteEmprendimientos, setFavoriteEmprendimientos] = useState([]);

  useEffect(() => {
    // obtiene los IDs de los favoritos desde localStorage
    const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];

    // filtra la lista completa de emprendimientos para obtener solo los favoritos
    const filteredEmprendimientos = emprendimientos.filter(item =>
      favoriteIds.includes(item.id) //usamos el 'id' para filtrar
    );

    setFavoriteEmprendimientos(filteredEmprendimientos);

  }, []);

  return (
    <>
      <Navbar />
      <h2 className="text-2xl font-bold p-6">Favoritos</h2> {}

      {favoriteEmprendimientos.length > 0 ? (
        // si hay favoritos, se muestran
        <div className="flex flex-wrap gap-8 justify-center p-6 -mt-5">
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 p-3 m-2">
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
        </div>
      ) : (
        // si no hay favoritos, muestra el mensaje
        <p className="p-6 text-gray-600">
          Aún no tienes emprendimientos marcados como favoritos. Explora la página principal y añádelos!
        </p>
      )}
    </>
  );
}