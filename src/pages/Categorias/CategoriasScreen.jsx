import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { CardEmprendimiento } from "../../components";
import { api } from "../../api/api";
import slugify from "../../functions/slugify";

export default function CategoriasScreen() {
  const [categorias, setCategorias] = useState([]);
  const [categoriasCargadas, setCategoriasCargadas] = useState(false);
  const location = useLocation();

  useEffect(() => {
    api
      .get("/categorias")
      .then((res) => {
        if (Array.isArray(res.data.categorias)) {
          setCategorias(res.data.categorias);
          setCategoriasCargadas(true);
        } else {
          console.error("Formato inesperado:", res.data);
        }
      })
      .catch((err) => {
        console.error("Error al obtener categorias:", err);
      });
  }, []);
  useEffect(() => {
    if (categoriasCargadas && location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location, categoriasCargadas]);


  return (
    <main className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#2C4692] m-1 -mt-2 p-2 text-center">
        Categorías
      </h1>
      {categorias.map((categoria) => {
        const slug = slugify(categoria.nombre || "sin-categoria");

        return (
          <section key={categoria.id} id={slug} className="mb-12">
            <h2 className="text-2xl font-semibold mb-2 text-[#2C4692] mx-21">
              {categoria.nombre}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-6 lg:px-8 py-6 w-full">
              {categoria.emprendimiento.length > 0 ? (
                categoria.emprendimiento.map((item) => (
                  <CardEmprendimiento
                    key={item.id}
                    id={item.id}
                    nombre={item.nombre}
                    descripcion={item.descripcion}
                    categoria={categoria.nombre}
                    imagen={item.imagen}
                  />
                ))
              ) : (
                <p className="text-gray-500 italic">
                  No hay emprendimientos en esta categoría.
                </p>
              )}
            </div>
          </section>
        );
      })}
    </main>
  );
}
