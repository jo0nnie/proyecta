export default function MetodoPagoCard({
    tipo,
    terminacion,
    vencimiento,
    cvcGuardado,
    onEditar,
    onEliminar,
    esAgregar,
}) {
    if (esAgregar) {
        return (
            <div className="bg-gray-200 -lg w-60 p-4 text-center cursor-pointer hover:shadow-md" onClick={onEditar}>
                <div className="bg-[#2C4391] text-white rounded-t-lg py-2"></div>
                <div className="mt-4">
                    <p className="text-[#2C4391] font-bold">Agregar método</p>
                    <p className="text-sm text-gray-600">de pago</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-200 rounded-lg w-60 p-4">
            <div className="bg-[#2C4391] text-white rounded-t-lg px-4 py-2 font-bold">
                {tipo} ••••{terminacion}
            </div>
            <div className="mt-2 text-sm text-gray-600">
                <p>{vencimiento} / {cvcGuardado ? "CVC guardado" : "CVC no guardado"}</p>
            </div>
            <div className="mt-4 flex gap-2">
                <button
                    className="bg-[#2C4391] text-white px-3 py-1 rounded-full text-sm"
                    onClick={onEditar}
                >
                    Editar
                </button>
                <button
                    className="bg-[#060F2A] text-white px-3 py-1 rounded-full text-sm"
                    onClick={onEliminar}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}
