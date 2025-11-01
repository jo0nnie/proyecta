import { CardEmprendimiento } from "../../components";
import emprendimientos from "../../utils/emprendimientoMock.json";

export default function HistorialScreen() {

  //cree una variable para mostrar, a modo de ejemplo, un solo emprendimiento en la pagina del historial
  const emprendimientoEjemplo = emprendimientos.filter(item => item.id > "5");
  return (
    <>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary-500 m-2 p-2 text-center">Historial</h1>
        <div className="ml-7 mr-7 mb-6">
          <p className=" text-gray-600 text-center">
            Emprendimientos que has visitado recientemente.
          </p>
          <div className="absolute left-0 right-0 border-b border-primary-500 pt-4"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 p-6">
        {emprendimientoEjemplo.map((item) => (
          <CardEmprendimiento
            key={item.id}
            id={item.id}
            nombre={item.nombre}
            descripcion={item.descripcion}
            categoria={item.categoria}
            imagen={item.imagen}
            boosted={item.boosted}
          />
        ))}
      </div>
    </>
  );
}

