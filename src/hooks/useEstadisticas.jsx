import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../api/api";

export function useEstadisticas() {
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const token = useSelector((state) => state.auth.token); 

  useEffect(() => {
    const fetchEstadisticas = async () => {
      if (!token) {
        setError("Token no disponible");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/estadisticas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEstadisticas(response.data);
      } catch (err) {
        console.error("Error al obtener estadísticas:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, [token]);

  return { estadisticas, loading, error };
}