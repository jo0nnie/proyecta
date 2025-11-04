import { api } from "../api/api";

export const useVaciarCarritoItems = async (carritosId) => {
  if (!carritosId) throw new Error("ID de carrito inválido");

  try {
    const res = await api.delete(`/carritos/${carritosId}/items`);
    console.log("Carrito vaciado:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error al vaciar carrito:", err.response?.data || err.message);
    throw err;
  }
};

