import CrearEmprendimientoForm from './components/CrearEmprendimientoForm';

const CrearEmprendimientoScreen = () => {
  return (
    <div className="max-w-xl mx-auto mt-7 p-6 bg-white shadow-md rounded mb-7">
      <h2 className="text-2xl font-bold mb-4 text-[#2B4590] text-center">Crear Emprendimiento</h2>
      <CrearEmprendimientoForm />
    </div>
  );
};

export default CrearEmprendimientoScreen;
