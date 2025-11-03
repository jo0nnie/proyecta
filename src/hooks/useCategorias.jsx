import { useState, useEffect } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";

export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get("/categorias");
        setCategorias(response.data.categorias);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
        toast.error("No se pudieron cargar las categorías.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  return { categorias, loading };
};