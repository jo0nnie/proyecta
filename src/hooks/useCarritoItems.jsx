import { useState, useCallback, useEffect } from "react";
import { api } from "../api/api";

export const useCarritoItems = (carritosId) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    if (!carritosId || isNaN(carritosId)) {
      setItems([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/carritos/${carritosId}/items`);
      console.log("response del back", res)
      const fetchedItems = Array.isArray(res.data?.items)
        ? res.data.items
        : [];

      setItems(fetchedItems);
    } catch (err) {
      const mensaje = err.response?.data?.error || err.message;
      console.error("❌ Error al obtener ítems del carrito:", mensaje);
      setError(mensaje);
      setItems([]);
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