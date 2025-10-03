export default function SelectorEmprendimiento({ emprendimientos, selectedId, onChange }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="selector-emprendimiento" className="text-sm font-semibold text-[#2B4590]">
        Cambiar emprendimiento
      </label>
      <select
        id="selector-emprendimiento"
        className="border border-[#2B4590] rounded p-2 text-sm text-gray-700"
        value={selectedId}
        onChange={(e) => onChange(e.target.value)}
      >
        {emprendimientos.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
