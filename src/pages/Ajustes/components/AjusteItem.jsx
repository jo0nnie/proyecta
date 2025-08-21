export default function AjusteItem({ titulo, descripcion, textoBoton, onClick, colorBoton, children }) {
  return (
    <div className="pl-7 pr-7 pt-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold" style={{ color: "#2C4391" }}>
          {titulo}
        </h2>
        {textoBoton && (
          <button
            onClick={onClick}
            className="text-white px-4 py-2 rounded transition"
            style={{
              backgroundColor: colorBoton || "#2C4391",
            }}
          >
            {textoBoton}
          </button>
        )}
      </div>

      {descripcion && (
        <div className="mt-1 text-black">
          <p>{descripcion}</p>
        </div>
      )}

      {children && <div className="pt-3">{children}</div>} 
      {/* el contenido en el children se muestra con un margen arriba*/}

      <div className="border-b border-[#2C4692] pt-4"></div>
    </div>
  );
}
