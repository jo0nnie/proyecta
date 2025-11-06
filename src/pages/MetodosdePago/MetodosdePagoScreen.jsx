import { useEffect, useState } from "react";
import { MetodoPagoCard } from "../../components";
import { api } from "../../api/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormularioMetodoPago from "../../components/FormularioMetodoPago";
export default function MetodosDePagoScreen() {
  const [metodos, setMetodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [metodoEditado, setMetodoEditado] = useState(null);

  const token = useSelector((state) => state.auth.token);
  if (!token) {
    return <div className="text-center p-8">No estás autenticado.</div>;
  }

  const cargarMetodos = async () => {
    try {
      const res = await api.get("/metodos-de-pago", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMetodos(res.data);
    } catch (error) {
      console.error("Error al cargar métodos:", error.response?.data?.msg || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMetodos();
  }, [token]);

  const handleEditar = (metodo) => {
    setMetodoEditado(metodo);
    setEditandoId(metodo.id);
    setMostrarFormulario(true);
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este método de pago?")) return;

    try {
      await api.delete(`/metodos-de-pago/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMetodos(metodos.filter((m) => m.id !== id));
      toast.success("Método eliminado.");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error al eliminar.");
    }
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setEditandoId(null);
    setMetodoEditado(null);
  };

  if (loading) {
    return <div className="text-center p-8">Cargando Métodos de Pago...</div>;
  }

  return (
    <div className="pb-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2C4692] m-4 p-2 text-center">
          Mis Métodos de Pago
        </h2>
        <p className="mt-1 text-black text-center">
          Agrega, edita o elimina tus métodos de pago desde aquí.
        </p>
      </div>

      <div className="flex justify-center items-start gap-8">
        <div className="flex gap-8 m-8 flex-wrap">
          {metodos.map((metodo) => (
            <MetodoPagoCard
              key={metodo.id}
              nombreDeTitular={metodo.nombreDelTitular}
              tipoDeTarjeta={metodo.tipoTarjeta}
              numeroDeTarjeta={metodo.numero}
              vencimiento={new Date(metodo.vencimiento).toLocaleDateString("es-AR", {
                month: "2-digit",
                year: "2-digit",
              })}
              cvc="•••"
              onEditar={() => handleEditar(metodo)}
              onEliminar={() => handleEliminar(metodo.id)}
            />
          ))}
          <MetodoPagoCard
            esAgregar={true}
            onEditar={() => {
              setMostrarFormulario(true);
              setEditandoId(null);
              setMetodoEditado(null);
            }}
          />
        </div>

        {mostrarFormulario && (
          <FormularioMetodoPago
            token={token}
            editandoId={editandoId}
            metodoInicial={metodoEditado}
            onSuccess={() => {
              cargarMetodos();
              handleCancelar();
            }}
            onCancel={handleCancelar}
          />
        )}
      </div>
    </div>
  );
}