import { useState, useEffect, useCallback } from "react";
import { api } from "../api/api";

export const useCarritoItems = (carritosId) => {
  const [items, setItems] = useState([16]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    if (!carritosId || typeof carritosId !== "number") {
      console.warn("❌ carritosId inválido:", carritosId);
      setItems([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/carritos/${carritosId}/items`);
      console.log("📦 Respuesta cruda del backend:", res.data);

      const items = Array.isArray(res.data.items) ? res.data.items : [];
      setItems(items);
    } catch (err) {
      const mensaje = err.response?.data?.error || err.message;
      console.error("❌ Error al obtener ítems del carrito:", mensaje);
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  }, [carritosId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    loading,
    error,
    refresh: fetchItems,
  };
};

