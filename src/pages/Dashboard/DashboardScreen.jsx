import { FiUsers, FiHome, FiTag, FiDollarSign } from 'react-icons/fi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { FaRegCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function DashboardScreen() {
  const stats = [
    { label: 'Usuarios Boosted', value: 100, icon: FiUsers },
    { label: 'Establecimientos Boosted', value: 5, icon: FiHome },
    { label: 'Categorías Boosted', value: 10, icon: FiTag },
    { label: 'Ingresos Generados', value: '$4000', icon: FiDollarSign },
  ];

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

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center" style={{ color: '#2C4692' }}>
          Dashboard
        </h1>
        <p className="text-lg mt-1 text-center" style={{ color: '#2C4692', opacity: 0.8 }}>
          ¡Hola admin! Bienvenido a tu dashboard!
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
          Usuarios Boostedados
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr style={{ backgroundColor: '#2C4692', opacity: 0.1, color: '#2C4692' }}>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Categoría</th>
                <th className="px-4 py-2">Fecha de pago</th>
                <th className="px-4 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 flex items-center gap-2">
                    <MdOutlineRestaurantMenu style={{ color: '#2C4692' }} />
                    {user.nombre}
                  </td>
                  <td className="px-4 py-2">{user.categoria}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <FaRegCalendarAlt style={{ color: '#2C4692', opacity: 0.6 }} />
                    {user.fecha}
                  </td>
                  <td className="px-4 py-2 font-medium flex items-center gap-2">
                    {user.estado === 'Pagado' ? (
                      <>
                        <FaCheckCircle style={{ color: '#2C4692' }} />
                        <span style={{ color: '#2C4692' }}>{user.estado}</span>
                      </>
                    ) : (
                      <>
                        <FaTimesCircle style={{ color: '#E53E3E' }} />
                        <span style={{ color: '#E53E3E' }}>{user.estado}</span>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}