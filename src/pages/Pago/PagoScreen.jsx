import { useState, useEffect } from "react";
import {
  PlanCard,
  MetodoPagoCard,
  CarritoResumen,
  SelectorEmprendimiento,
  DetallePago,
} from "../../components";
import planes from "../../utils/planesMock";
import { api } from "../../api/api";

export default function PagoScreen() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <div className="text-center p-8">No estás autenticado.</div>;
  }

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emprendimientoActivoId, setEmprendimientoActivoId] = useState(null);
  const [boostearTodos, setBoostearTodos] = useState(false);
  const emprendimientosDelPerfil = usuario?.emprendimiento || [];
  const carritoItems = usuario?.carrito?.idCarritosItems || [];
  const carritosId = usuario?.carrito?.id;

  useEffect(() => {
    const cargarUsuarioConCarrito = async () => {
      try {
        const res = await api.get("/usuarios/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(res.data.usuario || res.data);

        const emps = res.data.emprendimiento || [];
        if (emps.length > 0 && !emprendimientoActivoId) {
          setEmprendimientoActivoId(String(emps[0].id));
        }
      } catch (err) {
        console.error(
          "Error al cargar datos:",
          err.response?.data || err.message
        );
        alert(
          "No se pudieron cargar tus datos. Por favor, inicia sesión nuevamente."
        );
      } finally {
        setLoading(false);
      }
    };

    cargarUsuarioConCarrito();
  }, [token]);

  if (loading) {
    return <div className="text-center p-8">Cargando tu carrito...</div>;
  }

  const emprendimientoActivo = emprendimientosDelPerfil.find(
    (e) => String(e.id) === String(emprendimientoActivoId)
  );

  const agregarAlCarrito = (plan) => {
    alert("Función de agregar al carrito aún no conectada. (Próximo paso)");
    console.log("Agregar plan:", plan, "al carrito ID:", carritosId);
  };

  const vaciarCarrito = () => {
    alert("Vaciar carrito aún no implementado.");
  };

  const eliminarDelCarrito = (index) => {
    alert("Eliminar item aún no implementado.");
  };

  return (
    <div>
      <nav className="p-5 border-b border-[#2B4590]">
        <h1 className="flex justify-center text-xl font-bold">
          Boosteo de Emprendimientos
        </h1>
        <h2 className="flex justify-center">
          ¡Haz que tu emprendimiento llegue a más personas!
        </h2>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 p-6 border-b w-full border-[#2B4590] bg-[#F9FAFB]">
        {planes.map((plan) => (
          <div key={plan.id} className="flex-shrink-0">
            <PlanCard
              plan={plan}
              onObtener={() => agregarAlCarrito(plan)}
              isSeleccionado={carritoItems.some(
                (item) =>
                  item.planesId === plan.id &&
                  item.emprendimientos.some(
                    (e) => String(e.id) === String(emprendimientoActivo?.id)
                  )
              )}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-10">
        <div className="flex justify-center items-start">
          {emprendimientosDelPerfil.length > 0 && (
            <SelectorEmprendimiento
              emprendimientos={emprendimientosDelPerfil}
              selectedId={emprendimientoActivoId}
              onSelect={setEmprendimientoActivoId}
              boostearTodos={boostearTodos}
              setBoostearTodos={setBoostearTodos}
            />
          )}
        </div>

        <div className="flex justify-center items-start">
          {carritoItems.length > 0 && (
            <CarritoResumen
              carrito={carritoItems.map((item) => ({
                ...item.planes,
                emprendimientoId: item.emprendimientos[0]?.id,
                nombreEmprendimiento:
                  item.emprendimientos[0]?.nombre || "Sin nombre",
                imagen: item.emprendimientos[0]?.imagen || "",
                idCarritoItem: item.id,
              }))}
              onVaciar={vaciarCarrito}
              onEliminar={eliminarDelCarrito}
            />
          )}
        </div>

        <div
          className={`flex flex-col items-center gap-10 border-l border-[#2B4590] pl-10 ${
            carritoItems.length === 0 ? "opacity-30 pointer-events-none" : ""
          }`}
        >
          <nav className="border rounded-xl border-[#2B4590] w-full">
            <p className="border-b border-[#2B4590] p-5">
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
