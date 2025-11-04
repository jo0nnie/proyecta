import { useState } from "react";
import Button from "./Button";

export default function PlanCard({ plan, onObtener, isSeleccionado }) {
  const { nombre, descripcion, duracionDias, precio } = plan;
  const [loading, setLoading] = useState(false);

  const descripcionArray = typeof descripcion === "string"
    ? descripcion.split(";").map((item) => item.trim()).filter(Boolean)
    : Array.isArray(descripcion)
      ? descripcion
      : [];

  const handleObtener = async () => {
    if (loading || isSeleccionado) return;
    setLoading(true);
    try {
      await onObtener(plan);
    } catch (err) {
      console.error("Error al agregar plan:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col justify-between w-[300px] h-[400px] border-2 rounded-xl p-6 shadow-md hover:shadow-xl cursor-pointer bg-white border-[#2B4590]`}>
      <div>
        <h2 className="text-2xl font-bold text-[#2B4590] mb-4">{nombre}</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          {descripcionArray.map((dato, index) => (
            <li key={index}>{dato}</li>
          ))}
        </ul>
        <p className="text-sm text-gray-600 mb-2">
          Duración: <span className="font-semibold">{duracionDias}</span> días
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 mt-4">
        <p className="text-2xl font-bold text-[#2B4590]">${precio}</p>
        <Button
          text={
            isSeleccionado
              ? "Seleccionado"
              : loading
              ? "Agregando..."
              : "Obtener"
          }
          disabled={loading || isSeleccionado}
          onClick={handleObtener}
        />
      </div>
    </div>
  );
}