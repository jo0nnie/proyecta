import { CardEmprendimiento } from "../../components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import emprendimientos from "../../utils/emprendimientoMock.json";
import slugify from "../../functions/slugify";

export default function CategoriasScreen() {
  const [emprendimientosPorCategoria, setEmprendimientosPorCategoria] = useState({});
  const location = useLocation();
//use effect para efecto de scrolleo automático
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location, emprendimientosPorCategoria]);

  useEffect(() => {
    const agrupados = emprendimientos.reduce((acc, item) => {
      if (!acc[item.categoria]) acc[item.categoria] = [];
      acc[item.categoria].push(item);
      return acc;
    }, {});
    setEmprendimientosPorCategoria(agrupados);
  }, []);
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#2C4692] m-1 -mt-2 p-2 text-center">
        Categorías
      </h1>


      {Object.entries(emprendimientosPorCategoria).map(([categoria, items]) => {
        const slug = slugify(categoria);
        return (
          <section key={categoria} id={slug} className="mb-12">

            <h2 className="text-2xl font-semibold mb-2 text-[#2C4692] mx-21">{categoria}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 -px-8 py-6 max-w-7xl mx-auto justify-items-center">
              {items.map((item) => (
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
          </section>
        );
      })}

    </main>
  );
}