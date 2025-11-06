import { RiDeleteBin7Fill } from "react-icons/ri";

export default function CarritoResumen({ carrito, onVaciar, onEliminar }) {
  console.log("🧾 carritoItems:", carrito);
  const total = carrito.reduce((acc, item) => {
    const precio = item?.plan?.precio ?? 0;
    return acc + precio;
  }, 0);
  return (
    <div className="border rounded-xl border-[#2B4590] w-full p-5 shadow-md bg-white">
      <h1 className="text-center font-bold text-xl mb-4 text-[#2B4590]">
        Resumen del Pedido
      </h1>

      <ul className="flex flex-col gap-4">
        {carrito.map((item) => {
          const emprendimiento = item.emprendimientos[0];
          return (
            <li
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={emprendimiento?.imagen ?? "/placeholder.jpg"}
                  alt={emprendimiento?.nombre ?? "Emprendimiento"}
                  className="h-10 w-10 rounded-full object-cover border border-[#2B4590]"
                  onError={(e) => (e.target.src = "/placeholder.jpg")}
                />
                <div>
                  <p className="font-semibold text-[#2B4590]">
                    {emprendimiento?.nombre ?? "Sin nombre"}
                  </p>
                  <p className="text-sm text-gray-600">{item.plan.nombre}</p>
                  <p className="text-sm text-gray-600">
                    Duración: {item.plan.duracionDias} día(s)
                  </p>
                </div>
              </div>
              <button
                onClick={() => onEliminar(item.id)}
                className="text-[#2B4590] text-lg hover:scale-110 transition"
                title="Eliminar ítem"
              >
                <RiDeleteBin7Fill />
              </button>
            </li>
          );
        })}
      </ul>

      <p className="font-bold text-right mt-4 text-[#2B4590]">
        Total:{" "}
        {new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency: "ARS",
        }).format(total)}
      </p>

      <button
        onClick={onVaciar}
        className="text-blue-500 text-sm mt-2 underline hover:text-blue-700"
      >
        Vaciar carrito
      </button>
    </div>
  );
}