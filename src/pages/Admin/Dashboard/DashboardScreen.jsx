import { FiUsers, FiHome, FiTag, FiDollarSign } from 'react-icons/fi';
import {  FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useEstadisticas } from '../../../hooks/useEstadisticas';
import { useSelector } from 'react-redux';
import { useUsuariosConectados } from '../../../hooks/useUsuariosConectados';
export default function DashboardScreen() {
  const { estadisticas, loading, error } = useEstadisticas();
  const usuario = useSelector((state) => state.auth.usuario);
  const { usuarios, loading: loadingUsuarios, error: errorUsuarios } = useUsuariosConectados();
  const stats = estadisticas
    ? [
      { label: "Usuarios registrados", value: estadisticas.usuarios, icon: FiUsers },
      { label: "Emprendimientos creados", value: estadisticas.emprendimientos, icon: FiHome },
      { label: "Categorías", value: estadisticas.categorias, icon: FiTag },
      { label: "Planes disponibles", value: estadisticas.planes, icon: FiDollarSign },
    ]
    : [];

  const users = [
    {
      nombre: "Mauro's Food",
      categoria: 'Cocina',
      fecha: '22/06/05',
      estado: 'Pagado',
    },
    {
      nombre: '---',
      categoria: '---',
      fecha: '19/06/25',
      estado: 'No Pagado',
    },
    {
      nombre: '---',
      categoria: 'Categoría',
      fecha: '19/06/25',
      estado: 'Pagado',
    },
  ];
  if (loading) {
    return (
      <main className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-xl text-blue-700">Cargando estadísticas...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">Error al cargar estadísticas.</p>
      </main>
    );
  }
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center" style={{ color: '#2C4692' }}>
          Dashboard
        </h1>
        <p className="text-lg mt-1 text-center" style={{ color: '#2C4692', opacity: 0.8 }}>
          ¡Hola {usuario?.nombre || "usuario"}! Bienvenido a tu dashboard!
        </p>
      </div>

      {/* stats con íconos en azul */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-4 flex items-center space-x-4"
            >
              <Icon style={{ color: '#2C4692' }} size={24} />
              <div>
                <span className="text-sm" style={{ color: '#2C4692', opacity: 0.6 }}>
                  {stat.label}
                </span>
                <div className="text-2xl font-semibold" style={{ color: '#2C4692' }}>
                  {stat.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* tabla de users con íconos en azul */}

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: '#2C4692' }}>
          <FiUsers style={{ color: '#2C4692' }} />
          Usuarios Conectados
        </h2>

        {loadingUsuarios ? (
          <p className="text-blue-700">Cargando usuarios conectados...</p>
        ) : errorUsuarios ? (
          <p className="text-red-600">Error al cargar usuarios conectados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-white text-[#2C4692] text-sm leading-normal border-b border-[#2C4692]/30">
                  <th className="px-6 py-3 text-left font-bold">Nombre</th>
                  <th className="px-6 py-3 text-left font-bold">Email</th>
                  <th className="px-6 py-3 text-left font-bold">Emprendimientos</th>
                  <th className="px-6 py-3 text-left font-bold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 flex items-center gap-2">
                      <FiUsers style={{ color: '#2C4692' }} />
                      {user.nombre}
                    </td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.cantidadEmprendimientos}</td>
                    <td className="px-4 py-2 font-medium flex items-center gap-2">
                      {user.conectado ? (
                        <>
                          <FaCheckCircle style={{ color: '#38A169' }} />
                          <span style={{ color: '#38A169' }}>Conectado</span>
                        </>
                      ) : (
                        <>
                          <FaTimesCircle style={{ color: '#E53E3E' }} />
                          <span style={{ color: '#E53E3E' }}>Desconectado</span>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}