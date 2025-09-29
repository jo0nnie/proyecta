import { useState } from "react";
import { Button } from "../../components";
import MetodoPagoCard from "../../components/MetodoPagoCard";
import TextField from "../../components/TextField";

export default function MetodosdePagoScreen() {
  const [metodos, setMetodos] = useState([
    {
      tipo: "MasterCard",
      terminacion: "0004",
      vencimiento: "06/27",
      cvc: "123",
    },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoMetodo, setNuevoMetodo] = useState({
    tipo: "",
    terminacion: "",
    vencimiento: "",
    cvc: "",
  });
  const [editarMetododePago, seteditarMetododePago] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoMetodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const agregarMetodo = () => {
    if (
      nuevoMetodo.tipo &&
      nuevoMetodo.terminacion &&
      nuevoMetodo.vencimiento &&
      nuevoMetodo.cvc
    ) {
      setMetodos([...metodos, nuevoMetodo]);
      setNuevoMetodo({
        tipo: "",
        terminacion: "",
        vencimiento: "",
        cvc: "",
      });
      setMostrarFormulario(false);
    } else {
      alert("Por favor completá todos los campos.");
    }
  };

  const editarMetodo = (index) => {
    seteditarMetododePago(index);
    setNuevoMetodo(metodos[index]);
    setMostrarFormulario(true);
  };

  const guardarCambios = () => {
    if (
      nuevoMetodo.tipo &&
      nuevoMetodo.terminacion &&
      nuevoMetodo.vencimiento &&
      nuevoMetodo.cvc
    ) {
      const metodosActualizados = [...metodos];
      metodosActualizados[editarMetododePago] = nuevoMetodo;
      setMetodos(metodosActualizados);
      seteditarMetododePago(null);
      setNuevoMetodo({
        tipo: "",
        terminacion: "",
        vencimiento: "",
        cvc: "",
      });
      setMostrarFormulario(false);
    } else {
      alert("Por favor completá todos los campos.");
    }
  };

  const eliminarMetodo = (index) => {
    const confirmacion = window.confirm(
      "¿quiere eliminar este método de pago?"
    );

    if (confirmacion) {
      const nuevos = metodos.filter((_, i) => i !== index);
      setMetodos(nuevos);
    }
  };

  const cancelar = () => {
    setMostrarFormulario(false);
    seteditarMetododePago(null);
    setNuevoMetodo({
      tipo: "",
      terminacion: "",
      vencimiento: "",
      cvc: "",
    });
  };

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
          {metodos.map((m, idx) => (
            <MetodoPagoCard
              key={idx}
              tipo={m.tipo}
              terminacion={m.terminacion}
              vencimiento={m.vencimiento}
              cvc={m.cvc}
              onEditar={() => editarMetodo(idx)}
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
            <h3 className="text-[#2C4391] mb-3 flex justify-center font-bold">
              {editarMetododePago !== null
                ? "Editar Método de Pago"
                : "Nuevo Método de Pago"}
            </h3>
            <p className="mt-1 text-black pb-1">Metodo de Pago</p>
            <select
              className="border-2 p-2 px-4 mb-2 block w-full border-primary-500 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2C4692]"
              name="tipo"
              value={nuevoMetodo.tipo}
              onChange={handleInputChange}
            >
              <option value="" disabled hidden>
                Seleccione un tipo de tarjeta
              </option>
              <option value="MasterCard">MasterCard</option>
              <option value="Visa">Visa</option>
            </select>

            <p className="mt-1 text-black pb-1">Número de Tarjeta</p>
            <TextField
              placeholder={"0000 0000 0000 0000"}
              onInput={(e) => {
                if (e.target.value.length > e.target.maxLength) {
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
                }
              }}
              maxLength={16}
              type="number"
              name="terminacion"
              value={nuevoMetodo.terminacion}
              onChange={handleInputChange}
              className="border p-2 mb-2 block w-full"
            />
            <p className="mt-1 text-black pb-1">Vencimiento (MM/AA)</p>
            <TextField
              type="date"
              name="vencimiento"
              value={nuevoMetodo.vencimiento}
              onChange={handleInputChange}
              className="border p-2 mb-2 block w-full"
            />
            <p className="mt-1 text-black pb-1">CVC</p>
            <TextField
              placeholder={"0000"}
              onInput={(e) => {
                if (e.target.value.length > e.target.maxLength) {
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
                }
              }}
              maxLength={4}
              type="number"
              name="cvc"
              value={nuevoMetodo.cvc}
              onChange={handleInputChange}
              className="border p-2 mb-2 block w-full "
            />
            <div className="flex gap-3 mt-1">
              {editarMetododePago !== null ? (
                <Button
                  type="button"
                  text="Guardar Cambios"
                  onClick={guardarCambios}
                />
              ) : (
                <Button type="button" text="Guardar" onClick={agregarMetodo} />
              )}
              <Button type="button" text="Cancelar" onClick={cancelar} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
