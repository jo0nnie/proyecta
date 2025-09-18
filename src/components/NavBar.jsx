import { useState } from "react";
import Sidebar from "./SideBar/Sidebar"; // Importá el componente
import usuarioMock from "../utils/usuarioMock.json"

//get usuario foto
const usuarioLogueado = usuarioMock[0];
const fotoUsuario = usuarioLogueado.foto;

export default function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <nav className="bg-[#2C4391] px-6 py-3 flex justify-between items-center shadow-md relative">
        <div className="flex items-center space-x-3">
          <button onClick={toggleSidebar} className="text-white text-2xl focus:outline-none">
            ☰
          </button>
          <a href="/"> <img
            src="/Logo Cohete White.svg"
            alt="Logo Cohete"
            className="h-12 w-auto"
          /></a>

        </div>

        <div className="flex-1 mx-3 max-w-[600px] relative">
          <input
            type="text"
            placeholder="Buscar"
            className="w-full py-2 px-4 pl-5 pr-10 rounded-full bg-white text-[#2C4391] placeholder-[#2C4391] focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-4">
          <a href="/auth/login" className="text-white hover:text-[#E9E2EF]">Iniciar Sesión</a>
          <a href="/auth/register" className="text-white hover:text-[#E9E2EF]">Registrarse</a>
          {/* aca deberia de recibir la imagen del perfil del usuario */}
          <a href="/perfil"> <img src={fotoUsuario} alt="imagen usuario" width={40}></img></a>
        </div>
      </nav>

      {/* Acá montamos la Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
    </>
  );
}
