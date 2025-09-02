import { useState } from "react";
import MetodoPagoCard from "../../../components/MetodoPagoCard";

export default function MetodosDePago() {
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
        <div>
            <h2 className="text-2xl font-bold text-[#2C4391]">
                Editar métodos de pago
            </h2>
            <p className="text-gray-700 mb-4">
                Agrega, edita o elimina tus métodos de pago desde aquí.
            </p>

            <div className="flex gap-6 flex-wrap">
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
                <MetodoPagoCard esAgregar={true} onEditar={() => setMostrarFormulario(true)} />
            </div>
            {mostrarFormulario && (
                <div className="mt-6 bg-white p-4 rounded border shadow-md max-w-md">
                    <h3 className="font-bold text-[#2C4391] mb-3">Nuevo método de pago</h3>
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
                        <button
                            className="bg-[#2C4391] text-white px-4 py-1 rounded"
                            onClick={agregarMetodo}
                        >
                            Guardar
                        </button>
                        <button
                            className="bg-gray-400 text-white px-4 py-1 rounded"
                            onClick={() => setMostrarFormulario(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
