import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../api/api";

export function useUsuariosConectados() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.auth.token); 

  useEffect(() => {
    const fetchUsuarios = async () => {
      if (!token) {
        setError("Token no disponible");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/estadisticas/conectados", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsuarios(response.data);
      } catch (err) {
        console.error("Error al obtener usuarios conectados:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [token]);

  return { usuarios, loading, error };
}