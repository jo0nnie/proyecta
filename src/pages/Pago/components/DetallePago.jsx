import { useState } from 'react';
import { TextField, Button } from '../../../components';
import { api } from '../../../api/api';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { limpiarCarrito } from '../../../store/slice/carritoSlice';

export default function DetallePago({ metodoPagoId, onPagoExitoso }) {
  const dispatch = useDispatch();
  const [titular, setTitular] = useState('');
  const [numero, setNumero] = useState('');
  const [tipoTarjeta, setTipoTarjeta] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const formularioCompleto =
    titular && numero && tipoTarjeta && vencimiento && cvc;
  const puedePagar = metodoPagoId || formularioCompleto;

  const vencimientoValido = (mmYy) => {
    if (!/^\d{2}\/\d{2}$/.test(mmYy)) return false;

    const [mm, yy] = mmYy.split('/');
    const mes = parseInt(mm, 10);
    const anio = parseInt(yy, 10);

    if (mes < 1 || mes > 12) return false;

    const ahora = new Date();
    const anioActual = parseInt(String(ahora.getFullYear()).slice(-2), 10);
    const mesActual = ahora.getMonth() + 1;

    if (anio < anioActual || (anio === anioActual && mes < mesActual)) return false;

    return true;
  };

  const convertirVencimiento = (mmYy) => {
    if (!/^\d{2}\/\d{2}$/.test(mmYy)) return null;
    const [mm, yy] = mmYy.split('/');
    return `20${yy}-${mm}-01`;
  };

  const handleConfirmarPago = async () => {
    if (!puedePagar) return;

    const confirmar = window.confirm('¿Deseás confirmar el pago?');
    if (!confirmar) return;

    setLoading(true);

    try {
      if (!metodoPagoId && !vencimientoValido(vencimiento)) {
        throw new Error('Mes o año inválido');
      }

      const vencimientoISO = convertirVencimiento(vencimiento);
      if (!metodoPagoId && !vencimientoISO) {
        throw new Error("Formato de fecha de vencimiento inválido");
      }


      const payload = metodoPagoId
        ? { metodoPagoId }
        : {
          tarjetaTemporal: {
            nombreDelTitular: titular,
            numero: numero.replace(/\s/g, ''),
            tipoTarjeta,
            vencimiento: vencimientoISO,
            cvc,
          },
        };

      await api.post('/pagos', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('¡Pago realizado con éxito!');
      setTitular('');
      setNumero('');
      setTipoTarjeta('');
      setVencimiento('');
      setCvc('');
      await onPagoExitoso();
      dispatch(limpiarCarrito());
    } catch (err) {
      const msg = err.response?.data?.msg || err.message;
      console.error('Error al procesar el pago:', msg);
      alert(`Error al procesar el pago: ${msg}`);
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
          onChange={(e) => {
            const soloDigitos = e.target.value.replace(/\D/g, '');
            const conEspacios = soloDigitos.replace(/(\d{4})(?=\d)/g, '$1 ');
            setNumero(conEspacios);
          }}
        />

        <p>Fecha de Expiración</p>
        <TextField
          placeholder="MM/YY"
          value={vencimiento}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/\D/g, '').slice(0, 4);
            const formatted =
              cleaned.length >= 3
                ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`
                : cleaned;
            setVencimiento(formatted);
          }}
          maxLength={5}
          className="border p-2 mb-2 block w-full"
        />

        <p>Codigo de Seguridad</p>
        <TextField
          placeholder="CVC"
          value={cvc}
          onChange={(e) =>
            setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))
          }
          maxLength={3}
        />
      </ul>

      <div className="px-5 pb-5">
        <Button
          text={loading ? 'Procesando...' : 'Confirmar y Pagar'}
          onClick={handleConfirmarPago}
          disabled={!puedePagar || loading}
        />
      </div>
    </nav>
  );
}