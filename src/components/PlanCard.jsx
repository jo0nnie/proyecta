import Button from "./Button";

export default function PlanCard({ plan, onObtener, isSeleccionado }) {
  const { titulo, beneficio, duracion, precio } = plan;

  return (
    <div className="flex flex-col justify-between max-w-[500px] h-[360px] border-2 rounded-xl border-[#2B4590] p-6 shadow-md hover:shadow-xl cursor-pointer bg-white">
      <div>
        <h2 className="text-2xl font-bold text-[#2B4590] mb-4">{titulo}</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          {beneficio.map((dato, index) => (
            <li key={index}>{dato}</li>
          ))}
        </ul>
        <p className="text-sm text-gray-600 mb-2">
          Duración: <span className="font-semibold">{duracion}</span>
        </p>
        <p className="text-3xl font-bold text-[#2B4590] mb-4">${precio}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          text={isSeleccionado ? "Seleccionado" : "Obtener"}
          onClick={() => onObtener(plan)}
        />
      </div>
    </div>
  );
}
