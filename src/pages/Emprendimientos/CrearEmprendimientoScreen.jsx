import React from 'react';
import CrearEmprendimientoForm from './components/CrearEmprendimientoForm';

const CrearEmprendimientoScreen = () => {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-[#2B4590]">Crear Emprendimiento</h2>
      <CrearEmprendimientoForm />
    </div>
  );
};

export default CrearEmprendimientoScreen;
