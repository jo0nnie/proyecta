export default function CarritoResumen({ carrito, onVaciar, onEliminar }) {
    return (
        <div className="border rounded-xl border-[#2B4590] w-full p-5 shadow-md bg-white">
            <h1 className="flex justify-center font-bold text-xl mb-4 text-[#2B4590]">Resumen del Pedido</h1>

            <ul className="flex flex-col gap-4">
                {carrito.map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b pb-2">
                        <div className="flex items-center gap-3">
                            <img
                                src={item.imagen}
                                alt="logo"
                                className="h-10 w-10 rounded-full object-cover border border-[#2B4590]"
                            />
                            <div>
                                <p className="font-semibold text-[#2B4590]">{item.nombreEmprendimiento}</p>
                                <p className="text-sm text-gray-600">{item.titulo}</p>
                                <p className="text-sm text-gray-600">Duración: {item.duracion}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onEliminar(index)}
                            className="text-red-500 text-lg hover:scale-110 transition"
                        >❌
                        </button>
                    </li>
                ))}
            </ul>

            <p className="font-bold text-right mt-4 text-[#2B4590]">
                Total: ${carrito.reduce((acc, item) => acc + item.precio, 0)}
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
