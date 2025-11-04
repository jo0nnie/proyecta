import { useState } from 'react';
import { TextField, Button } from '../../../components';
import { api } from '../../../api/api';
import { useSelector } from 'react-redux';
// import { usePostPagos as handleConfirmarPago } from './../../../hooks/usePostPagos';
export default function DetallePago() {
  const [titular, setTitular] = useState('');
  const [numero, setNumero] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const formularioCompleto = titular && numero && mes && anio && cvc;
  const handleConfirmarPago = async () => {
    if (!formularioCompleto) return;

    const confirmar = window.confirm('¿Deseás confirmar el pago?');
    if (!confirmar) return;

    setLoading(true);

    try {
      const payload = {
        token,
        titular,
        numero,
        mes,
        anio,
        cvc,
      };

      const res = await api.post('/pagos', payload);
      console.log('Pago confirmado:', res.data);

      alert('¡Pago realizado con éxito!');
      setTitular('');
      setNumero('');
      setMes('');
      setAnio('');
      setCvc('');
    } catch (err) {
      console.error('Error al procesar el pago:', err.response?.data || err.message);
      alert('Error al procesar el pago. Intenta nuevamente.');
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
              <option key={i} value={i + 1}>
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
          onChange={(e) => setCvc(e.target.value)}
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