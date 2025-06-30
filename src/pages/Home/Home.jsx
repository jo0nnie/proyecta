import { Navbar, CardEmprendimiento } from "../../components";
import emprendimientos from "../../utils/emprendimientoMock.json"; //lista de emprendimientos

function displayEmprendimientos() {
  return (
    <div className="flex flex-wrap gap-6 justify-start p-6">
      {emprendimientos.map((item) => (
        <CardEmprendimiento
          // ¡Importante! Usar item.id como key.
          key={item.id}
          // ¡Pasamos el ID aquí!
          id={item.id}
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
      {displayEmprendimientos()} {}
    </>
  );
}