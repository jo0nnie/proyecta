import { api } from "../api/api";
export const vaciarCarritoItems = async (carritosId) => {
  if (!carritosId) throw new Error("ID de carrito inválido");

  const res = await api.delete(`/carritos/${carritosId}/items`);
  return res.data;
};