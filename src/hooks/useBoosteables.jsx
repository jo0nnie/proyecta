import { useState, useEffect } from "react";
import { api } from "../api/api";

export function useBoosteables(token) {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBoosteables = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/usuarios/emprendimientos-no-boosteados", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmprendimientos(res.data.emprendimientos || []);
    } catch (err) {
      console.error("Error al obtener boosteables:", err.response?.data || err.message);
      setError("No se pudieron cargar los emprendimientos disponibles para boostear");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchBoosteables();
  }, [token]);

  return {
    emprendimientos,
    loading,
    error,
    refetch: fetchBoosteables, 
  };
}