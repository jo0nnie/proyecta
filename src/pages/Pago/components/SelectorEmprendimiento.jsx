import perfilemprendimientoMock from "../../../utils/perfilemprendiemientoMock.json";

export default function SelectorEmprendimiento({
  emprendimientos,
  selectedId,
  onSelect,
  boostearTodos,
  setBoostearTodos,
}) {
  return (
    <div className="w-full max-w-md h-[400px] overflow-y-auto border rounded-xl p-4 shadow">
      <h2 className="text-lg font-bold mb-4 text-center text-primary-500">
        Emprendimientos del Usuario
      </h2>
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
      {emprendimientos.map((e) => {
        const perfil = perfilemprendimientoMock.find(
          (p) => String(p.id) === String(e.id)
        );
        return (
          <div
            key={e.id}
            className={`flex justify-between items-center p-3 mb-3 rounded border ${
              selectedId === e.id
                ? "border-primary-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={perfil?.imagen}
                alt="logo"
                className="h-10 w-10 rounded-full object-cover border border-primary-500"
              />
              <p className="font-semibold">{e.nombre}</p>
            </div>
            <button
              onClick={() => onSelect(e.id)}
              className={`px-3 py-1 rounded text-sm ${
                selectedId === e.id
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {selectedId === e.id ? "Seleccionado" : "Seleccionar"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
