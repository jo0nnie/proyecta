export default function CarritoItem({ item, onEliminar }) {
  const { imagen, nombreEmprendimiento, titulo, duracion, precio, idCarritoItem } = item;

  return (
    <li className="flex justify-between items-center border-b pb-2">
      <div className="flex items-center gap-3">
        <img
          src={imagen || "/placeholder.jpg"}
          alt={`Logo de ${nombreEmprendimiento}`}
          className="h-10 w-10 rounded-full object-cover border border-[#2B4590]"
        />
        <div>
          <p className="font-semibold text-[#2B4590]">{nombreEmprendimiento}</p>
          <p className="text-sm text-gray-600">{titulo}</p>
          <p className="text-sm text-gray-600">Duración: {duracion} días</p>
          <p className="text-sm text-gray-600">Precio: ${precio}</p>
        </div>
      </div>
      <button
        onClick={() => onEliminar(idCarritoItem)}
        className="text-red-500 text-lg hover:scale-110 transition"
        aria-label={`Eliminar ${titulo}`}
      >
        ❌
      </button>
    </li>
  );
}