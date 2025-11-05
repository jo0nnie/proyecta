import { useState } from 'react';
import { TextField, Button } from '../../../components';
import { api } from '../../../api/api';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { limpiarCarrito } from '../../../store/slice/carritoSlice';
import { useCarritoItems } from '../../../hooks/useCarritoItems';
import { toast } from 'react-toastify';
export default function DetallePago({ onPagoExitoso }) {
  const usuario = useSelector((state) => state.auth.usuario);
  const carritosId = usuario?.carrito?.id;
  const { refresh: recargarCarrito } = useCarritoItems(carritosId);
  const dispatch = useDispatch();
  const [titular, setTitular] = useState('');
  const [numero, setNumero] = useState('');
  const [tipoTarjeta, setTipoTarjeta] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const formularioCompleto =
    titular && numero && tipoTarjeta && mes && anio && cvc;

  const handleConfirmarPago = async () => {
    if (!formularioCompleto) return;

    const confirmar = window.confirm('¿Deseás confirmar el pago?');
    if (!confirmar) return;

    setLoading(true);

    try {
      const mesValido = mes.padStart(2, '0');
      const anioValido = String(anio);
      if (!/^\d{4}$/.test(anioValido) || !/^\d{2}$/.test(mesValido)) {
        throw new Error("Mes o año inválido");
      }

      const vencimiento = `${mesValido}/${anioValido.slice(-2)}`;
      const payload = {
        tarjetaTemporal: {
          nombreDelTitular: titular,
          numero: numero.replace(/\s/g, ''),
          tipoTarjeta,
          vencimiento,
          cvc,
        },
      };

      await api.post("/pagos", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('¡Pago realizado con éxito!');
      setTitular('');
      setNumero('');
      setTipoTarjeta('');
      setMes('');
      setAnio('');
      setCvc('');

      await recargarCarrito();
      dispatch(limpiarCarrito());
      await onPagoExitoso();

    } catch (err) {
      const msg = err.response?.data?.msg || err.message;
      console.error('Error al procesar el pago:', msg);
      toast.error(`Error al procesar el pago: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="border rounded-xl border-[#2B4590] w-full">
      <div className="border-b border-[#2B4590] p-5">
        <h1 className="flex text-[#2C4692] text-xl justify-center font-bold">Detalles de Pago</h1>
      </div>

      <ul className="m-5">
        <p>Titular de Tarjeta</p>
        <TextField
          placeholder="Nombre en el frente de la tarjeta"
          value={titular}
          onChange={(e) => setTitular(e.target.value)}
        />

        <p>Tipo de tarjeta</p>
        <select
          className="border rounded p-2 mb-2 w-full"
          value={tipoTarjeta}
          onChange={(e) => setTipoTarjeta(e.target.value)}
        >
          <option value="">Selecciona una tarjeta</option>
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
        </select>

        <p>Numero de Tarjeta</p>
        <TextField
          placeholder="0000 0000 0000 0000"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />

        <p>Fecha de Expiración</p>
        <div className="flex gap-10">
          <select
            className="w-1/2 border rounded p-2 text-sm text-gray-600"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
          >
            <option value="">Mes</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={String(i + 1).padStart(2, '0')}>
                {String(i + 1).padStart(2, '0')}
              </option>
            ))}
          </select>

          <select
            className="w-1/2 border rounded p-2 text-sm text-gray-600"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
          >
            <option value="">Año</option>
            {[...Array(10)].map((_, i) => {
              const year = new Date().getFullYear() + i;
              return (
                <option key={i} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <p>Codigo de Seguridad</p>
        <TextField
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
          maxLength={3}
        />
      </ul>

      <div className="px-5 pb-5">
        <Button
          text={loading ? 'Procesando...' : 'Confirmar y Pagar'}
          onClick={handleConfirmarPago}
          disabled={!formularioCompleto || loading}
        />
      </div>
     
    </nav>
  );
}