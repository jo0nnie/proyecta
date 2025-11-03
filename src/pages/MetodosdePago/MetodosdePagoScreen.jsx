import { useEffect, useState } from "react";
import { Button } from "../../components";
import MetodoPagoCard from "../../components/MetodoPagoCard";
import TextField from "../../components/TextField";
import { api } from "../../api/api";

export default function MetodosdePagoScreen() {
  const [metodos, setMetodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  const [formData, setFormData] = useState({
    nombreDelTitular: "",
    numero: "",
    tipoTarjeta: "",
    vencimiento: "",
    cvc: "",
  });

  const token = localStorage.getItem("token");
  if (!token) {
    return <div className="text-center p-8">No estás autenticado.</div>;
  }

  useEffect(() => {
    const cargarMetodos = async () => {
      try {
        const res = await api.get("/metodos-de-pago", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMetodos(res.data);
      } catch (error) {
        console.error(
          "Error al cargar métodos:",
          error.response?.data?.msg || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    cargarMetodos();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "numero") {
      const soloDigitos = value.replace(/\D/g, "");
      const conEspacios = soloDigitos.replace(/(\d{4})(?=\d)/g, "$1 ");
      setFormData((prev) => ({ ...prev, numero: conEspacios }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const convertirVencimiento = (mmYy) => {
    const [mm, yy] = mmYy.split("/");
    if (!mm || !yy || mm.length !== 2 || yy.length !== 2) return null;
    return `20${yy}-${mm}`;
  };

  const handleSubmit = async () => {
    const { nombreDelTitular, numero, tipoTarjeta, vencimiento, cvc } =
      formData;

    if (!nombreDelTitular || !numero || !tipoTarjeta || !vencimiento || !cvc) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const numeroLimpio = numero.replace(/\s/g, "");
    if (numeroLimpio.length !== 16) {
      alert("El número de tarjeta debe tener 16 dígitos.");
      return;
    }

    const vencimientoISO = convertirVencimiento(vencimiento);
    if (!vencimientoISO) {
      alert("Formato de vencimiento inválido. Usa MM/YY (ej: 06/27).");
      return;
    }

    const payload = {
      nombreDelTitular,
      numero: numeroLimpio,
      tipoTarjeta,
      vencimiento: vencimientoISO,
      cvc,
    };

    try {
      if (editandoId) {
        await api.put(`/metodos-de-pago/${editandoId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/metodos-de-pago", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      const res = await api.get("/metodos-de-pago", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMetodos(res.data);
      setMostrarFormulario(false);
      setEditandoId(null);
      setFormData({
        nombreDelTitular: "",
        numero: "",
        tipoTarjeta: "",
        vencimiento: "",
        cvc: "",
      });
    } catch (error) {
      const msg =
        error.response?.data?.msg || "Error al guardar el método de pago.";
      alert(msg);
    }
  };

  const handleEditar = (metodo) => {
    const fecha = new Date(metodo.vencimiento);
    const mm = String(fecha.getMonth() + 1).padStart(2, "0");
    const yy = String(fecha.getFullYear()).slice(-2);
    const vencimientoStr = `${mm}/${yy}`;
    const numeroConEspacios = metodo.numero.replace(/(\d{4})/g, "$1 ").trim();

    setFormData({
      nombreDelTitular: metodo.nombreDelTitular,
      numero: numeroConEspacios,
      tipoTarjeta: metodo.tipoTarjeta,
      vencimiento: vencimientoStr,
      cvc: "",
    });
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
    } catch (error) {
      alert(error.response?.data?.msg || "Error al eliminar.");
    }
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setEditandoId(null);
    setFormData({
      nombreDelTitular: "",
      numero: "",
      tipoTarjeta: "",
      vencimiento: "",
      cvc: "",
    });
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
              vencimiento={new Date(metodo.vencimiento).toLocaleDateString(
                "es-AR",
                {
                  month: "2-digit",
                  year: "2-digit",
                }
              )}
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
              setFormData({
                nombreDelTitular: "",
                numero: "",
                tipoTarjeta: "",
                vencimiento: "",
                cvc: "",
              });
            }}
          />
        </div>

        {mostrarFormulario && (
          <div className="mt-6 p-4 rounded border shadow-md max-w-md flex-grow ml-8">
            <h3 className="text-[#2C4391] mb-3 text-center font-bold">
              {editandoId ? "Editar Método de Pago" : "Nuevo Método de Pago"}
            </h3>

            <p className="text-black pb-1">Titular</p>
            <TextField
              name="nombreDelTitular"
              value={formData.nombreDelTitular}
              onChange={handleInputChange}
              className="border p-2 mb-2 block w-full"
            />

            <p className="text-black pb-1">Tipo de tarjeta</p>
            <select
              name="tipoTarjeta"
              value={formData.tipoTarjeta}
              onChange={handleInputChange}
              className="border-2 p-2 px-4 mb-2 block w-full border-primary-500 rounded-[10px]"
            >
              <option value="" disabled hidden>
                Seleccione una tarjeta
              </option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
            </select>

            <p className="text-black pb-1">Número de tarjeta</p>
            <TextField
              placeholder="0000 0000 0000 0000"
              name="numero"
              value={formData.numero}
              onChange={handleInputChange}
              maxLength={19}
              className="border p-2 mb-2 block w-full"
            />

            <p className="text-black pb-1">Vencimiento (MM/YY)</p>
            <TextField
              placeholder="MM / YY"
              name="vencimiento"
              value={formData.vencimiento}
              onChange={handleInputChange}
              maxLength={5}
              className="border p-2 mb-2 block w-full"
            />

            <p className="text-black pb-1">CVC</p>
            <TextField
              placeholder="0000"
              name="cvc"
              value={formData.cvc}
              onChange={handleInputChange}
              maxLength={4}
              type="password"
              className="border p-2 mb-2 block w-full"
            />

            <div className="flex gap-3 mt-4 justify-center">
              <Button
                text={editandoId ? "Guardar Cambios" : "Guardar"}
                onClick={handleSubmit}
                variante="light"
              />
              <Button text="Cancelar" onClick={handleCancelar} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
