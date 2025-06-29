import { Navbar, CardEmprendimiento, Carrusel} from "../../components";

import emprendimientos from "../../utils/emprendimientoMock.json";
function displayEmprendimientos() {
  return (
    <div className="flex flex-wrap gap-6 justify-start p-6">
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
      <Carrusel/>
      {displayEmprendimientos()}
    </>
  );
}
