import { useState, useEffect } from "react";
import { api } from "../api/api";

export function useEmprendimientosUsuario(token) {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmprendimientos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/usuarios/emprendimientos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmprendimientos(res.data || []);
    } catch (err) {
      console.error("Error al obtener emprendimientos:", err.response?.data || err.message);
      setError("No se pudieron cargar los emprendimientos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchEmprendimientos();
  }, [token]);

  return { emprendimientos, loading, error };
}