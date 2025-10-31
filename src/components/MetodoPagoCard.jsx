import { MdAddCard } from "react-icons/md";
import Button from "./Button";

export default function MetodoPagoCard({
  tipo,
  terminacion,
  vencimiento,
  cvc,
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
          <div className="bg-primary-400 rounded-t-lg h-8"></div>
          <div className="p-4 flex items-center justify-center gap-2 text-center">
            <MdAddCard className="text-primary-400 w-6 h-6" />
            <div>
              <p className="text-primary-400 font-bold m-0">Agregar método</p>
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
        <div className="bg-primary-400 rounded-t-lg h-8"></div>
        <div className="px-4 pt-3 pb-7 text-sm text-gray-600">
          <p className="font-bold text-primary-400">
            {tipo} {terminacion}
          </p>
          <p>
            {vencimiento} / {cvc}
          </p>
        </div>
      </div>
      <div className="mt-3 flex gap-2 justify-center">
        <Button text="Editar" onClick={onEditar} variant="light"/>
        <Button text="Eliminar" onClick={onEliminar}/>
      </div>
    </div>
  );
}