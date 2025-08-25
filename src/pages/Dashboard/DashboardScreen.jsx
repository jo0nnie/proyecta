import { FiUsers, FiHome, FiTag, FiDollarSign } from 'react-icons/fi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { FaRegCalendarAlt} from 'react-icons/fa';
import emprendimientos from '../../utils/emprendimientoMock.json';
import usuarios from '../../utils/usuarioMock.json'

export default function DashboardScreen() {
  // stats dinamicas
  const totalEmprendimientos = emprendimientos.length;
  const boosteados = 5; //falta leer usuarios boosteados en un mock
  const ingresos = '$4000'; //falta leer ingresos tambien que seria una funcion

  const stats = [
    { label: 'Usuarios', value: usuarios.length, icon: FiUsers },
    { label: 'Emprendimientos boosteados', value: boosteados, icon: FiHome },
    { label: 'Emprendimientos totales', value: totalEmprendimientos, icon: FiTag },
    { label: 'Ingresos Generados', value: ingresos, icon: FiDollarSign },
  ];

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#2C4692' }}>
          Dashboard
        </h1>
        <p className="text-lg mt-1" style={{ color: '#2C4692', opacity: 0.8 }}>
          ¡Hola admin! Bienvenido a tu dashboard!
        </p>
      </div>

      {/* stats con íconos */}
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

      {/* tabla de usuarios */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: '#2C4692' }}>
          <FiUsers style={{ color: '#2C4692' }} />
          Usuarios registrados
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr style={{ backgroundColor: '#2C4692', color: 'white' }}>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Correo</th>
                <th className="px-4 py-2">Ciudad</th>
                <th className="px-4 py-2">Último acceso</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 flex items-center gap-2">
                    <MdOutlineRestaurantMenu style={{ color: '#2C4692' }} />
                    {user.nombre || 'Sin nombre'}
                  </td>
                  <td className="px-4 py-2">{user.correo || 'Sin correo'}</td>
                  <td className="px-4 py-2">{user.ciudad || 'Sin ciudad'}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <FaRegCalendarAlt style={{ color: '#2C4692', opacity: 0.6 }} />
                    {user.lastLog || 'Sin datos'}
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