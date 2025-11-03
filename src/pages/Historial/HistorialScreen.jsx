import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CardEmprendimiento, Button } from "../../components";
import { api } from "../../api/api";
import { toast } from "react-toastify";
export default function HistorialScreen() {
  const token = useSelector((state) => state.auth.token);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistorial = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await api.get("/historial", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistorial(res.data);
    } catch (err) {
      console.error("Error al obtener historial:", err);
      toast.error("No se pudo cargar el historial");
    } finally {
      setLoading(false);
    }
  };

  const limpiarHistorial = async () => {
    if (!token) return;
    try {
      await api.delete("/historial", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistorial([]);
      toast.success("Historial limpiado");
    } catch (err) {
      console.error("Error al limpiar historial:", err);
      toast.error("No se pudo limpiar el historial");
    }
  };

  useEffect(() => {
    fetchHistorial();
  }, [token]);

  return (
    <>
      <h1 className="text-3xl font-bold text-[#2C4692] text-center mt-4">Historial</h1>
      <p className="text-gray-600 text-center mb-4">Emprendimientos que visitaste.</p>

      <div className="flex justify-center mb-6">
        <Button text="Limpiar historial" onClick={limpiarHistorial} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 pb-6">
        {historial.length > 0 ? (
          historial.map((item) => {
            const emp = item.emprendimiento;
            return (
              <CardEmprendimiento
                key={emp.id}
                id={emp.id}
                nombre={emp.nombre}
                descripcion={emp.descripcion}
                categoria={emp.Categorias?.nombre}
                imagen={emp.imagen}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Aún no has visitado ningún emprendimiento.
          </p>
        )}
      </div>
    </>
  );
}