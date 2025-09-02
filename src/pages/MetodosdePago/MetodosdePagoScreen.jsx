import { useState } from "react";
import { Button } from "../../components";
import MetodoPagoCard from "../../components/MetodoPagoCard";

export default function MetodosdePagoScreen() {
  const [metodos, setMetodos] = useState([
    {
      tipo: "Mastercard",
      terminacion: "0004",
      vencimiento: "06/27",
      cvcGuardado: true,
    },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoMetodo, setNuevoMetodo] = useState({
    tipo: "",
    terminacion: "",
    vencimiento: "",
    cvcGuardado: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoMetodo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const agregarMetodo = () => {
    if (
      nuevoMetodo.tipo &&
      nuevoMetodo.terminacion &&
      nuevoMetodo.vencimiento
    ) {
      setMetodos([...metodos, nuevoMetodo]);
      setNuevoMetodo({
        tipo: "",
        terminacion: "",
        vencimiento: "",
        cvcGuardado: false,
      });
      setMostrarFormulario(false);
    } else {
      alert("Por favor completá todos los campos.");
    }
  };

  const eliminarMetodo = (index) => {
    const nuevos = metodos.filter((_, i) => i !== index);
    setMetodos(nuevos);
  };

  return (
    <div container mx-auto p-4>
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
          {metodos.map((m, idx) => (
            <MetodoPagoCard
              key={idx}
              tipo={m.tipo}
              terminacion={m.terminacion}
              vencimiento={m.vencimiento}
              cvcGuardado={m.cvcGuardado}
              onEditar={() => alert("Simulación de edición")}
              onEliminar={() => eliminarMetodo(idx)}
            />
          ))}
          <MetodoPagoCard
            esAgregar={true}
            onEditar={() => setMostrarFormulario(true)}
          />
        </div>
        {mostrarFormulario && (
          <div className="mt-6 p-4 rounded border shadow-md max-w-md flex-grow ml-8">
            <h3 className="font-bold text-[#2C4391] mb-3">
              Nuevo método de pago
            </h3>
            <input
              type="text"
              name="tipo"
              placeholder="Tipo de tarjeta (Visa, etc)"
              value={nuevoMetodo.tipo}
              onChange={handleInputChange}
              className="border p-2 mb-2 block w-full"
            />
            <input
              type="text"
              name="terminacion"
              placeholder="Últimos 4 dígitos"
              value={nuevoMetodo.terminacion}
              onChange={handleInputChange}
              className="border p-2 mb-2 block w-full"
            />
            <input
              type="text"
              name="vencimiento"
              placeholder="Vencimiento (MM/AA)"
              value={nuevoMetodo.vencimiento}
              onChange={handleInputChange}
              className="border p-2 mb-2 block w-full"
            />
            <label className="flex items-center gap-2 text-sm mb-3">
              <input
                type="checkbox"
                name="cvcGuardado"
                checked={nuevoMetodo.cvcGuardado}
                onChange={handleInputChange}
              />
              Guardar CVC
            </label>
            <div className="flex gap-3">
              <Button type="button" text="Guardar" onClick={agregarMetodo} />
              <Button
                type="button"
                text="Cancelar"
                onClick={() => {
                  setMostrarFormulario(false);
                  setNuevoMetodo({
                    tipo: "",
                    terminacion: "",
                    vencimiento: "",
                    cvcGuardado: false,
                  });
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
