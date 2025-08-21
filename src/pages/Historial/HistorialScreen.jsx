import { CardEmprendimiento } from "../../components";
import emprendimientos from "../../utils/emprendimientoMock.json";

export default function HistorialScreen() {

    //cree una variable para mostrar, a modo de ejemplo, un solo emprendimiento en la pagina del historial
    const emprendimientoEjemplo = emprendimientos.find(item => item.id === "1");
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold pl-7 pt-5">Historial</h2>
        <div className="ml-7 mr-7 mb-6">
          <p className="mt-1 text-black">
            Emprendimientos que has visitado recientemente.
          </p>
          <div className="absolute left-0 right-0 border-b border-[#2C4692] pt-4"></div> 
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-3">
        {emprendimientoEjemplo && (
            <CardEmprendimiento
              key={emprendimientoEjemplo.id}
              id={emprendimientoEjemplo.id}
              nombre={emprendimientoEjemplo.nombre}
              descripcion={emprendimientoEjemplo.descripcion}
              categoria={emprendimientoEjemplo.categoria}
              imagen={emprendimientoEjemplo.imagen}
            />
          )}
    </div>
    </>
  );
}

