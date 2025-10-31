import { useState } from 'react';
import { TextField, Button } from '../../../components';

export default function DetallePago() {
  const [titular, setTitular] = useState('');
  const [numero, setNumero] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [cvc, setCvc] = useState('');

  const formularioCompleto = titular && numero && mes && anio && cvc;

  const handleConfirmarPago = () => {
    if (!formularioCompleto) return;
    const confirmar = window.confirm('¿Deseás confirmar el pago?');
    if (confirmar) {
      alert('¡Pago realizado!');
      setTitular('');
      setNumero('');
      setMes('');
      setAnio('');
      setCvc('');
    }
  };


  return (
    <nav className='border rounded-xl border-primary-500 w-full'>
      <p className='border-b border-primary-500 p-5'>
        <h1 className='flex justify-center font-bold'>Detalles de Pago</h1>
      </p>
      <ul className='m-5'>
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
        <nav className='flex gap-10'>
          <select
            className="w-1/2 border rounded p-2 text-sm text-gray-600"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
          >
            <option value="">Mes</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
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
              return <option key={i} value={year}>{year}</option>;
            })}
          </select>
        </nav>
        <p>Codigo de Seguridad</p>
        <TextField
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
        />
      </ul>
      <div className="px-5 pb-5">
        <Button text="Confirmar y Pagar" onClick={handleConfirmarPago} disabled={!formularioCompleto} />
      </div>
    </nav>
  );
}
