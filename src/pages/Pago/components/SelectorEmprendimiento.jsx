import { Button } from '../../../components';

export default function SelectorEmprendimiento({
  emprendimientos,
  selectedId,
  onSelect,
  boostearTodos,
  setBoostearTodos
}) {
  return (
    <div className="w-full max-w-md h-[400px] overflow-y-auto border-2 border-[#2B4590] rounded-xl p-4 shadow">
      <h2 className="text-lg font-bold mb-4 text-center text-[#2B4590]">
        Emprendimientos del Usuario
      </h2>

      {emprendimientos.map((e) => (
        <div
          key={e.id}
          className={`flex justify-between items-center p-4 mb-4 rounded-xl border border-[#2B4590] shadow ${selectedId === e.id ? 'ring-2 ring-[#2B4590] bg-blue-50' : ''
            }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={e.imagen || '/placeholder.jpg'}
              alt="logo"
              className="h-10 w-10 rounded-full object-cover border border-[#2B4590]"
            />
            <p className="font-semibold">{e.nombre}</p>
          </div>
          <Button
            onClick={() => onSelect(selectedId === e.id ? null : e.id)}
            className={`px-3 py-1 rounded text-sm ${selectedId === e.id
              ? 'bg-[#2B4590] text-white'
              : 'bg-gray-200 text-gray-700'
              }`}
            text={selectedId === e.id ? 'Seleccionado' : 'Seleccionar'}
          />
        </div>
      ))}

      <label className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          checked={boostearTodos}
          onChange={(e) => setBoostearTodos(e.target.checked)}
        />
        <span className="text-sm text-gray-700">
          Boostear todos con el mismo plan
        </span>
      </label>
    </div>
  );
}