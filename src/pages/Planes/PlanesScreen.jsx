import { useEffect, useState } from 'react';
import PlanCard from '../../components/PlanCard';
import { api } from '../../api/api'; // asumimos que api tiene axios o fetch configurado

export default function PlanesScreen() {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await api.get('/planes');
        setPlanes(response.data);
      } catch (err) {
        console.error('Error al obtener los planes:', err);
        setError('No se pudieron cargar los planes');
      } finally {
        setLoading(false);
      }
    };

    fetchPlanes();
  }, []);

  return (
    <div className='bg-[#f9f9f9] min-h-screen'>
      <nav className='p-5 border-b border-[#2B4590] bg-white'>
        <h1 className='flex justify-center text-2xl font-bold text-[#2B4590]'>Planes de Boosteo</h1>
        <h2 className='flex justify-center text-gray-700'>Conocé más acerca de los distintos planes que tenemos para tus emprendimientos</h2>
      </nav>

      <div className="flex flex-col lg:flex-row lg:justify-center gap-8 p-10">
        {loading && <p className="text-center text-gray-500">Cargando planes...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {planes.map((plan, index) => (
          <PlanCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
}