import Button from "./Button";

export default function PlanCard({ plan, onObtener, isSeleccionado }) {
  const { titulo, beneficio, duracion, precio } = plan;

  return (
    <div
      // altura minima anterior al fix: min-h-[360px]
      className={`flex-1 flex flex-col justify-between p-6  border-2 rounded-xl border-primary-500 shadow-md hover:shadow-xl cursor-pointer ${
        isSeleccionado
          ? "bg-primary-500 text-white"
          : "bg-white text-primary-500"
      }`}
    >
      <div>
        <h2 className="text-2xl font-bold mb-4">{titulo}</h2>
        <div
          className={`${isSeleccionado ? "text-gray-300" : "text-gray-700"}`}
        >
          {isSeleccionado}
          <ul className={`list-disc list-inside mb-4 `}>
            {beneficio.map((dato, index) => (
              <li key={index}>{dato}</li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={`flex flex-col gap-2 ${
          isSeleccionado ? "text-gray-300" : "text-gray-700"
        }`}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm align-middle">
            Duración: <span className="font-semibold">{duracion}</span>
          </span>
          <p
            className={`text-3xl font-bold ${
              isSeleccionado ? "text-white" : "text-primary-500"
            }`}
          >
            ${precio}
          </p>
        </div>
        <Button
          variant={isSeleccionado ? "ligth" : "dark"}
          text={isSeleccionado ? "Seleccionado" : "Obtener"}
          onClick={() => onObtener(plan)}
          fullWidth
        />
      </div>
    </div>
  );
}
