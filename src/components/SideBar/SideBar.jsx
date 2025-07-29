import { config } from "./config";
import { SideBarItem } from "./SideBarItem";

export default function SideBar({ isOpen, onClose }) {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#2C4391] text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-40 shadow-lg flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-white">
          <img
            src="/Logo Cohete White.svg"
            alt="Logo Cohete"
            className="h-10 w-auto"
          />
          <button onClick={onClose} className="text-2xl text-white"> ☰
          </button>
        </div>

        {/* Menú */}
        <ul className="p-4 space-y-2 flex-1">
          {config.map((item, index) => (
            <SideBarItem key={index} text={item.title} path={item.path} />
          ))}
        </ul>

        {/* Sección inferior */}
        <div className="p-4 border-t border-white space-y-2">
          <SideBarItem text="Ajustes" path="/Ajustes" />
          <a href="#" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-[#3c56a5] transition-colors">
            <span>Cerrar Sesión</span>
          </a>
        </div>
      </div>
    </>
  );
};

