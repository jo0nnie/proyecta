import { useState, useEffect } from "react";
import { api } from "../api/api";

export function usePlanes() {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlanes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/planes");
      setPlanes(res.data || []);
    } catch (err) {
      console.error("Error al obtener planes:", err.response?.data || err.message);
      setError("No se pudieron cargar los planes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanes();
  }, []);

  return { planes, loading, error };
}