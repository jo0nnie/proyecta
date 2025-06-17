export default function NavBar() {
  return (
    <nav className="bg-[#2C4391] px-6 py-3 flex justify-between items-center shadow-md">
      {/* logo */}
      <div className="flex items-center space-x-3">
        <img
          src="/Logo Cohete White.svg"
          alt="Logo Cohete"
          className="h-12 w-auto"
        />
      </div>
      {/* input */}
      <div className="flex-1 mx-3 max-w-[600px] relative">
        <input
          type="text"
          placeholder="Buscar"
          className="w-full py-2 px-4 pl-5 pr-10 rounded-full bg-[#E9E2EF] text-[#2C4391] placeholder-[#2C4391] focus:outline-none"
        />
      </div>

      <div className="flex items-center space-x-4">
        <a
          href="#"
          className="text-white hover:text-[#E9E2EF] transition-colors duration-200"
        >
          Iniciar Sesión
        </a>
        <a
          href="#"
          className="text-white hover:text-[#E9E2EF] transition-colors duration-200"
        >
          Registrarse
        </a>
      </div>
    </nav>
  );
}
