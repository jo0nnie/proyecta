import { Navbar, CardEmprendimiento, Carrusel } from "../../components";

import emprendimientos from "../../utils/emprendimientoMock.json";
function displayEmprendimientos() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-3">
      {emprendimientos.map((item, index) => (
        <CardEmprendimiento
          key={index}
          nombre={item.nombre}
          descripcion={item.descripcion}
          categoria={item.categoria}
          imagen={item.imagen}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="mt-2">
        <Carrusel />
      </div>
      <div className="-mt-10">
        {displayEmprendimientos()}
      </div>
    </>
  );
}
