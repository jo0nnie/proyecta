import { MdAddCard } from "react-icons/md";

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
            <div className="w-60">
                <div
                    className="bg-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition"
                    onClick={onEditar}
                >
                    <div className="bg-[#2C4391] rounded-t-lg h-8"></div>
                    <div className="p-4 flex items-center justify-center gap-2 text-center">
                        <MdAddCard className="text-[#2C4391] w-6 h-6" />
                        <div>
                            <p className="text-[#2C4391] font-bold m-0">Agregar método</p>
                            <p className="text-sm text-gray-600 m-0">de pago</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3 h-[34px]"></div>
            </div>
        );
    }

    return (
        <div className="w-60">
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
                <div className="bg-[#2C4391] rounded-t-lg h-8"></div>
                <div className="px-4 pt-3 pb-7 text-sm text-gray-600">
                    <p className="font-bold text-[#2C4391]">{tipo} ••••{terminacion}</p>
                    <p>{vencimiento} / {cvcGuardado ? "CVC guardado" : "CVC no guardado"}</p>
                </div>
            </div>
            <div className="mt-3 flex gap-2 justify-center">
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
