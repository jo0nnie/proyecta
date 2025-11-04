import { useState, useEffect } from "react";
import {
  PlanCard,
  CarritoResumen,
  SelectorMetodoPago,
  DetallePago,
  SelectorEmprendimiento
} from "../../components";
import { api, setAuthToken } from "../../api/api";
import { useSelector, useDispatch } from "react-redux";
import { usePlanes } from "../../hooks/usePlanes";
import { useEmprendimientosUsuario } from "../../hooks/useEmprendimientosUsuario";
import { toast } from "react-toastify";
import { useCarritoItems } from "../../hooks/useCarritoItems";
import { useVaciarCarritoItems } from "../../hooks/useVaciarCarritoItems";
import { setUsuario } from "../../store/slice/authSlice";
export default function PagoScreen() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  if (token) setAuthToken(token);
  const usuario = useSelector((state) => state.auth.usuario);
  const usuarioId = usuario?.id;

  const { emprendimientos, loading, error } = useEmprendimientosUsuario(token);
  const { planes, loading: loadingPlanes, error: errorPlanes } = usePlanes();

  const carritosId = usuario?.carrito?.id;
  const carritoActivo = useCarritoItems(carritosId);
  const { items: carritoItems, loading: loadingCarrito, refresh: recargarCarrito } = carritoActivo;

  const emprendimientosDelPerfil = emprendimientos || [];
  const [emprendimientoActivoIds, setEmprendimientoActivoIds] = useState([]);
  const [boostearTodos, setBoostearTodos] = useState(false);
  const [ultimoPlanAgregado, setUltimoPlanAgregado] = useState(null);

  useEffect(() => {
    if (emprendimientosDelPerfil.length > 0 && emprendimientoActivoIds.length === 0) {
      setEmprendimientoActivoIds([emprendimientosDelPerfil[0].id]);
    }
  }, [emprendimientosDelPerfil]);

  useEffect(() => {
    if (!usuario?.carrito?.id && usuario?.id) {
      crearCarritoSiNoExiste();
    }
  }, [usuario?.carrito?.id, usuario?.id]);

  const crearCarritoSiNoExiste = async () => {
    if (!usuarioId) return null;

    try {
      const res = await api.post("/carritos", { usuarioId });
      dispatch(setUsuario({ ...usuario, carrito: res.data }));
      await recargarCarrito();
      return res.data.id;
    } catch (err) {
      const yaExiste = err.response?.data?.detalle === "El usuario ya tiene un carrito";
      if (yaExiste) {
        return err.response?.data?.carritoId || usuario?.carrito?.id || null;
      }
      console.error("Error al crear carrito:", err.response?.data || err.message);
      return null;
    }
  };

  const agregarAlCarrito = async (plan) => {
    let carritoIdFinal = usuario?.carrito?.id;
    if (!carritoIdFinal) {
      carritoIdFinal = await crearCarritoSiNoExiste();
      if (!carritoIdFinal) return;
    }

    const emprendimientosIds = boostearTodos
      ? emprendimientosDelPerfil.map((e) => e.id)
      : emprendimientoActivoIds;

    if (emprendimientosIds.length === 0) {
      toast.info("Seleccioná al menos un emprendimiento.");
      return;
    }

    const yaExistenIds = carritoItems
      .filter((item) => item.planesId === plan.id)
      .flatMap((item) => item.emprendimientos?.map((e) => e.id) || []);

    const nuevosIds = emprendimientosIds.filter((id) => !yaExistenIds.includes(id));
    if (nuevosIds.length === 0) {
      toast.info("Ese plan ya fue agregado a los emprendimientos seleccionados.");
      return;
    }

    try {
      await api.post("/items", {
        carritosId: carritoIdFinal,
        planesId: plan.id,
        emprendimientosIds: nuevosIds,
      });

      await recargarCarrito();
      setUltimoPlanAgregado(plan);
      toast.success("Plan agregado correctamente.");
      setEmprendimientoActivoIds([]);
      setBoostearTodos(false);
    } catch (err) {
      toast.error("Error al agregar al carrito.");
      console.error("POST /items falló:", err.response?.data || err.message);
    }
  };

  const eliminarDelCarrito = async (idCarritoItem) => {
    try {
      await api.delete(`/items/${idCarritoItem}`);
      await recargarCarrito();
      toast.success("Item eliminado del carrito.");
    } catch (err) {
      console.error("Error al eliminar:", err.response?.data || err.message);
      toast.error("Error al eliminar del carrito.");
    }
  };

  const vaciarCarrito = async () => {
    if (carritoItems.length === 0) return;
    if (!window.confirm("¿Seguro que deseas vaciar todo el carrito?")) return;

    try {
      await useVaciarCarritoItems(carritosId);
      await recargarCarrito();
      setUltimoPlanAgregado(null);
      toast.success("Carrito vaciado correctamente.");
    } catch (err) {
      toast.error("Error al vaciar el carrito.");
    }
  };

  if (!token) return <div className="text-center p-8">No estás autenticado.</div>;
  if (loadingPlanes || loading) return <div className="text-center p-8">Cargando tu carrito...</div>;
  if (errorPlanes || error) return <div className="text-center p-8 text-red-500">{errorPlanes || error}</div>;

  return (
    <div>
      <nav className="p-5 border-b border-[#2B4590]">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2C4692] m-1 -mt-2 p-2 text-center">
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
              onObtener={agregarAlCarrito}
              isSeleccionado={carritoItems.some(
                (item) =>
                  item.planesId === plan.id &&
                  item.emprendimientos.some((e) =>
                    emprendimientoActivoIds.includes(e.id)
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
              selectedIds={emprendimientoActivoIds}
              onSelect={setEmprendimientoActivoIds}
              boostearTodos={boostearTodos}
              setBoostearTodos={setBoostearTodos}
            />
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          {carritoItems.length > 0 && (
            <>
              <CarritoResumen
                carrito={carritoItems}
                onVaciar={vaciarCarrito}
                onEliminar={eliminarDelCarrito}
              />
            </>
          )}
        </div>

        <div className={`flex flex-col items-center gap-10 border-l border-[#2B4590] pl-10 ${carritoItems.length === 0 ? "opacity-30 pointer-events-none" : ""}`}>
                    <nav className="border rounded-xl border-[#2B4590] w-full">
            <div className="border-b border-[#2B4590] p-5">
              <h1 className="flex text-[#2C4692] text-xl justify-center font-bold">Escoge tu Medio de Pago</h1>
            </div>
            <ul className="flex flex-col m-5 items-center">
              <SelectorMetodoPago
                token={token}
                onSelect={(idMetodo) => console.log("Seleccionaste método:", idMetodo)}
              />
            </ul>
          </nav>
          <DetallePago />
        </div>
      </div>
    </div>
  );
}