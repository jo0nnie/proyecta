import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function SelectorMetodoPago({ token, onSelect }) {
  const [metodos, setMetodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seleccionado, setSeleccionado] = useState("");

  useEffect(() => {
    const cargarMetodos = async () => {
      try {
        const res = await api.get("/metodos-de-pago", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMetodos(res.data);
      } catch (error) {
        console.error("Error al cargar métodos:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarMetodos();
  }, [token]);

  const handleChange = (e) => {
    const id = e.target.value;
    setSeleccionado(id);
    if (onSelect) onSelect(id);
  };

  if (loading) return <p>Cargando métodos de pago...</p>;

  if (metodos.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No tenés métodos de pago guardados. <br />
        Agregá uno desde tu perfil.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-start">
      <label htmlFor="metodoPago" className="text-gray-700 mb-2">
        Selecciona tu método de pago:
      </label>
      <select
        id="metodoPago"
        value={seleccionado}
        onChange={handleChange}
        className="border border-[#2B4590] rounded-lg p-2 w-64"
      >
        <option value="" disabled hidden>
          -- Elegí una tarjeta --
        </option>
        {metodos.map((m) => (
          <option key={m.id} value={m.id}>
            {m.tipoTarjeta} terminada en {m.numero.slice(-4)}
          </option>
        ))}
      </select>
    </div>
  );
}
