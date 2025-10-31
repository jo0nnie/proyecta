import PlanCard from '../../components/PlanCard';
import planesInfo from '../../utils/planesInfoMock.json';

export default function PlanesScreen() {
  return (
    <div className='bg-white min-h-screen'>
      <nav className='p-5 border-b border-primary-500 bg-white'>
        <h1 className='flex justify-center text-2xl font-bold text-primary-500'>Planes de Boosteo</h1>
        <h2 className='flex justify-center text-gray-700'>Conocé más acerca de los distintos planes que tenemos para tus emprendimientos</h2>
      </nav>
      <div className="flex flex-col lg:flex-row lg:justify-center gap-8 p-10">
        {planesInfo.map((plan, index) => (
          <PlanCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
}
