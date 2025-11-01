import { useState } from "react";
import SideBar from "./SideBar/SideBar";
import { PiUserCircleFill } from "react-icons/pi";

export default function NavBar() {
  // TODO cambiar la logica del token guardado en localStorage
  const token = localStorage.getItem("token");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const NavItem = ({ href, children }) => (
    <a href={href} className="text-white hover:text-primary-300">
      {children}
    </a>
  );

  return (
    <>
      <nav className="bg-primary-500 px-6 py-3 flex justify-between items-center shadow-md relative">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="text-white text-2xl focus:outline-none"
          >
            ☰
          </button>
          <a href="/">
            <img
              src="/Logo_Cohete_White.svg"
              alt="Logo Cohete"
              className="h-12 w-auto"
            />
          </a>
        </div>

        <div className="flex-1 mx-3 max-w-[600px] relative">
          <input
            type="text"
            placeholder="Buscar"
            className="w-full py-2 px-4 pl-5 pr-10 rounded-full bg-white text-primary-400 placeholder-primary-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-4">
          {!token ? (
            <>
              <NavItem href="/auth/login">Iniciar Sesión</NavItem>
              <NavItem href="/auth/register">Registrarse</NavItem>
              <NavItem href="/emprendimientos">Emprendimientos</NavItem>
            </>
          ) : (
            <>
              <NavItem href="/perfil/miemprendimiento">Crear emprendimiento</NavItem>
              <NavItem href="/perfil">
                <PiUserCircleFill className="w-12 h-12" />
              </NavItem>
            </>
          )}
        </div>
      </nav>

      <SideBar isOpen={sidebarOpen} onClose={closeSidebar} />
    </>
  );
}
