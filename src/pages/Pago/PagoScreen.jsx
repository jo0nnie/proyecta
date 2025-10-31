import { useState } from "react";
import {
  PlanCard,
  MetodoPagoCard,
  CarritoResumen,
  SelectorEmprendimiento,
  DetallePago,
} from "../../components";
import planes from "../../utils/planesMock";
import perfilemprendimientoMock from "../../utils/perfilemprendiemientoMock.json";

export default function PagoScreen() {
  const emprendimientosDelPerfil = [
    { id: "999", nombre: "Tienda EcoPosadas" },
    { id: "997", nombre: "Panadería La Miga" },
    { id: "996", nombre: "Estudio Creativo Pixel" },
    { id: "995", nombre: "Papelería Creativa Mandarina" },
    { id: "994", nombre: "Estética Vegana Alma" },
    { id: "993", nombre: "Taller de Cerámica Tierra Roja" },
  ];

  const [emprendimientoActivoId, setEmprendimientoActivoId] = useState(
    emprendimientosDelPerfil[0].id
  );
  const [carrito, setCarrito] = useState([]);
  const [boostearTodos, setBoostearTodos] = useState(false);

  const emprendimientoActivo = perfilemprendimientoMock.find(
    (e) => String(e.id) === String(emprendimientoActivoId)
  );

  const agregarAlCarrito = (plan) => {
    if (boostearTodos) {
      const nuevosItems = emprendimientosDelPerfil.map((e) => {
        const perfil = perfilemprendimientoMock.find(
          (p) => String(p.id) === String(e.id)
        );
        return {
          ...plan,
          emprendimientoId: e.id,
          nombreEmprendimiento: e.nombre,
          imagen: perfil?.imagen || "",
        };
      });
      setCarrito(nuevosItems);
      return;
    }

    const indexExistente = carrito.findIndex(
      (p) => p.emprendimientoId === emprendimientoActivo.id
    );

    const yaSeleccionado = carrito[indexExistente]?.titulo === plan.titulo;
    const perfilActivo = perfilemprendimientoMock.find(
      (p) => String(p.id) === String(emprendimientoActivo.id)
    );

    if (yaSeleccionado) {
      const nuevoCarrito = [...carrito];
      nuevoCarrito.splice(indexExistente, 1);
      setCarrito(nuevoCarrito);
    } else {
      const nuevoCarrito = [...carrito];
      const nuevoItem = {
        ...plan,
        emprendimientoId: emprendimientoActivo.id,
        nombreEmprendimiento: emprendimientoActivo.nombre,
        imagen: perfilActivo?.imagen || "",
      };

      if (indexExistente !== -1) {
        nuevoCarrito[indexExistente] = nuevoItem;
      } else {
        nuevoCarrito.push(nuevoItem);
      }

      setCarrito(nuevoCarrito);
    }
  };

  const vaciarCarrito = () => setCarrito([]);
  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  return (
    <div>
      <nav className="p-5 border-b border-primary-400">
        <h1 className="flex justify-center text-xl font-bold ">
          Boosteo de Emprendimientos
        </h1>
        <h1 className="flex justify-center">
          ¡Haz que tu emprendimiento llegue a más personas!
        </h1>
      </nav>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 justify-center gap-4 p-6">
        {planes.map((plan, index) => (
          <PlanCard
            key={`plan-${plan.id}-${index}`}
            plan={plan}
            onObtener={() => agregarAlCarrito(plan)}
            isSeleccionado={carrito.some(
              (p) =>
                p.titulo === plan.titulo &&
                p.emprendimientoId === emprendimientoActivo?.id
            )}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-10">
        <div className="flex justify-center items-start">
          <SelectorEmprendimiento
            emprendimientos={emprendimientosDelPerfil}
            selectedId={emprendimientoActivoId}
            onSelect={setEmprendimientoActivoId}
            boostearTodos={boostearTodos}
            setBoostearTodos={setBoostearTodos}
          />
        </div>

        <div className="flex justify-center items-start">
          {carrito.length > 0 && (
            <CarritoResumen
              carrito={carrito}
              onVaciar={vaciarCarrito}
              onEliminar={eliminarDelCarrito}
            />
          )}
        </div>

        <div
          className={`flex flex-col items-center gap-10 border-l border-primary-400 pl-10 ${
            carrito.length === 0 ? "opacity-30 pointer-events-none" : ""
          }`}
        >
          <nav className="border rounded-xl border-primary-400 w-full">
            <p className="border-b border-primary-400 p-5">
              <h1 className="flex justify-center font-bold">
                Escoge tu Medio de Pago
              </h1>
            </p>
            <ul className="flex flex-col m-5 items-center">
              <MetodoPagoCard />
            </ul>
          </nav>
          <DetallePago />
        </div>
      </div>
    </div>
  );
}