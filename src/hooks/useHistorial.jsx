import { useSelector } from "react-redux";
import { api } from "../api/api";
import { toast } from "react-toastify";

export function useHistorial() {
  const token = useSelector((state) => state.auth.token);

  const registrarVisita = async (emprendimientoId) => {
    if (!token) return;
    try {
      console.log("Enviando a /historial:", emprendimientoId);
      await api.post(
        "/historial",
        { emprendimientoId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.error("Error al registrar visita:", err);
    }
  };

  const limpiarHistorial = async () => {
    if (!token) return;
    try {
      await api.delete("/historial", {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Historial limpiado");
    } catch (err) {
      console.error("Error al limpiar historial:", err);
      toast.error("No se pudo limpiar el historial");
    }
  };

  return {
    registrarVisita,
    limpiarHistorial,
  };
}