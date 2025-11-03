import { useState, useEffect } from "react";
import {
  PlanCard,
  CarritoResumen,
  SelectorMetodoPago,
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

  const recargarUsuario = async () => {
    try {
      const res = await api.get("/usuarios/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuario(res.data.usuario || res.data);
    } catch (err) {
      console.error(
        "Error al recargar usuario:",
        err.response?.data || err.message
      );
      alert("Error al actualizar el carrito. Por favor, recarga la página.");
    }
  };

  useEffect(() => {
    recargarUsuario();
  }, [token]);

  useEffect(() => {
    if (usuario && !emprendimientoActivoId) {
      const emps = usuario.emprendimiento || [];
      if (emps.length > 0) {
        setEmprendimientoActivoId(String(emps[0].id));
      }
    }
  }, [usuario, emprendimientoActivoId]);

  useEffect(() => {
    if (usuario) {
      setLoading(false);
    }
  }, [usuario]);

  const emprendimientoActivo = emprendimientosDelPerfil.find(
    (e) => String(e.id) === String(emprendimientoActivoId)
  );

  const agregarAlCarrito = async (plan) => {
    if (!carritosId) {
      alert("Carrito no disponible. Por favor, recarga la página.");
      return;
    }

    const empsParaBoostear = boostearTodos
      ? emprendimientosDelPerfil.map((e) => e.id)
      : emprendimientoActivo
      ? [emprendimientoActivo.id]
      : [];

    if (empsParaBoostear.length === 0) {
      alert("Selecciona un emprendimiento primero.");
      return;
    }

    try {
      for (const empId of empsParaBoostear) {
        const yaExiste = carritoItems.some(
          (item) =>
            item.planesId === plan.id &&
            item.emprendimientos.some((e) => e.id === empId)
        );

        if (!yaExiste) {
          await api.post("/items", {
            carritosId,
            planesId: plan.id,
            emprendimientosIds: [empId],
          });
        }
      }

      await recargarUsuario();
    } catch (err) {
      console.error(
        "Error al agregar al carrito:",
        err.response?.data || err.message
      );
      alert(
        "Error al agregar al carrito: " +
          (err.response?.data?.detalle || "intenta nuevamente")
      );
    }
  };

  const eliminarDelCarrito = async (index) => {
    const item = carritoItems[index];
    if (!item) return;

    try {
      await api.delete(`/items/${item.id}`);
      await recargarUsuario();
    } catch (err) {
      console.error("Error al eliminar:", err.response?.data || err.message);
      alert(
        "Error al eliminar del carrito: " +
          (err.response?.data?.detalle || "intenta nuevamente")
      );
    }
  };

  const vaciarCarrito = async () => {
    if (carritoItems.length === 0) return;
    if (!window.confirm("¿Seguro que deseas vaciar todo el carrito?")) return;

    try {
      await Promise.all(
        carritoItems.map((item) => api.delete(`/carritos-items/${item.id}`))
      );
      await recargarUsuario();
    } catch (err) {
      console.error(
        "Error al vaciar carrito:",
        err.response?.data || err.message
      );
      alert(
        "Error al vaciar el carrito. Algunos items pueden haberse eliminado."
      );
    }
  };

  if (loading) {
    return <div className="text-center p-8">Cargando tu carrito...</div>;
  }

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
            <div className="border-b border-[#2B4590] p-5">
              <h1 className="flex justify-center font-bold">
                Escoge tu Medio de Pago
              </h1>
            </div>
            <ul className="flex flex-col m-5 items-center">
              <SelectorMetodoPago
                token={token}
                onSelect={(idMetodo) =>
                  console.log("Seleccionaste método:", idMetodo)
                }
              />
            </ul>
          </nav>
          <DetallePago />
        </div>
      </div>
    </div>
  );
}
