export default function CarritoResumen({ carrito, onVaciar }) {
    const total = carrito.reduce((acc, item) => acc + Number(item.precio), 0);

    return (
        <div className="border rounded-xl border-[#2B4590] p-4 w-full max-w-sm">
            <h2 className="font-bold text-center mb-4">Resumen del Pedido</h2>
            {carrito.length === 0 ? (
                <p className="text-gray-500 text-center">No hay planes seleccionados</p>
            ) : (
                <ul className="space-y-2">
                    {carrito.map((item, index) => (
                        <li key={index} className="border-b pb-2">
                            <p className="text-[#2B4590] font-semibold">{item.nombreEmprendimiento}</p>
                            <p className="text-sm text-gray-600">{item.titulo} – ${item.precio}</p>
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex justify-between items-center mt-4">
                <p className="font-bold">Total: ${total}</p>
                <button
                    onClick={onVaciar}
                    className="text-sm text-red-600 underline hover:text-red-800"
                >Vaciar carrito 
                </button>
            </div>
        </div>
    );
}
