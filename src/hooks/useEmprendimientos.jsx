import { useState, useEffect } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";

export const useEmprendimientos = (searchTerm = "") => {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const normalizeText = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  useEffect(() => {
    const fetchEmprendimientos = async () => {
      try {
        const res = await api.get("/emprendimientos");
        const lista = Array.isArray(res.data.emprendimientos)
          ? res.data.emprendimientos
          : [];

        const term = normalizeText(searchTerm);

        const filtrados = term
          ? lista.filter(
              (item) =>
                normalizeText(item.nombre).includes(term) ||
                normalizeText(item.Categorias?.nombre || "").includes(term)
            )
          : lista;

        setEmprendimientos(filtrados);
      } catch (err) {
        console.error("Error al obtener emprendimientos:", err);
        toast.error("No se pudieron cargar los emprendimientos.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmprendimientos();
  }, [searchTerm]);

  return { emprendimientos, loading };
};
