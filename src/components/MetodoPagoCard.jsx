import { MdAddCard } from "react-icons/md";
import Button from "./Button";

export default function MetodoPagoCard({
  nombreDeTitular,
  tipoDeTarjeta,
  vencimiento,
  numeroDeTarjeta,
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
          <div className="bg-primary-500 rounded-t-lg h-8"></div>
          <div className="p-4 flex items-center justify-center gap-2 text-center">
            <MdAddCard className="text-primary-500 w-6 h-6" />
            <div>
              <p className="text-primary-500 font-bold m-0">Agregar método</p>
              <p className="text-sm text-gray-600 m-0">de pago</p>
            </div>
          </div>
        </div>
        <div className="mt-3 h-[34px]"></div>
      </div>
    );
  }
  return (
    <div className="w-80">
      <div className="bg-gray-100 rounded-xl shadow-md border border-primary-500 overflow-hidden">
        <div className="bg-primary-500 h-12 flex items-center px-5">
          <span className="text-white font-bold">{tipoDeTarjeta}</span>
        </div>

        <div className="px-5 pt-4 pb-6 text-sm text-gray-700">
          <p className="font-semibold text-primary-500 mb-1">
            {nombreDeTitular}
          </p>
          <p className="font-mono text-primary-500 text-lg mb-2">
            <span>
              {numeroDeTarjeta} / {cvc}
            </span>
          </p>
          <p className="text-sm font-semibold text-gray-600 mb-1">
            Vence:{vencimiento}
          </p>
        </div>
      </div>

      <div className="mt-3 flex gap-2 justify-center">
        <Button
          text="Editar"
          onClick={onEditar}
          variante="light"
          className="px-4 py-2 text-sm"
        />
        <Button
          text="Eliminar"
          onClick={onEliminar}
          className="px-4 py-2 text-sm"
        />
      </div>
    </div>
  );
}
