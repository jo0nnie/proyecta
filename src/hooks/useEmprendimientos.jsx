import { useState, useEffect } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";

export const useEmprendimientos = () => {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmprendimientos = async () => {
      try {
        const res = await api.get("/emprendimientos");
        if (Array.isArray(res.data.emprendimientos)) {
          setEmprendimientos(res.data.emprendimientos);
        } else {
          console.error("Formato inesperado:", res.data);
          toast.error("Formato inesperado en la respuesta del servidor.");
        }
      } catch (err) {
        console.error("Error al obtener emprendimientos:", err);
        toast.error("No se pudieron cargar los emprendimientos.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmprendimientos();
  }, []);

  return { emprendimientos, loading };
};