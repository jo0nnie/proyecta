import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { configUser, configDrop, configAdmin, configPublic } from "./config";
import { SideBarItem, SideBarDropItem } from "./SideBarItem";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slice/authSlice";
import {ROLES} from '../../constants/roles'
export default function SideBar({ isOpen, onClose }) {
  const sidebarRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  let config = configPublic;

  if (token && user) {
    config = user.rol === ROLES.ADMIN ? configAdmin : configUser;
  }




  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate("/");
  };



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);



  return (
    <div
      ref={sidebarRef}
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
        <button onClick={onClose} className="text-2xl text-white">
          ☰
        </button>
      </div>

      {/* Menú principal */}
      <ul className="p-4 space-y-2 flex-1">
        {config.map((item, index) => (
          <SideBarItem
            key={index}
            text={item.title}
            path={item.path}
            onClose={onClose}
          />
        ))}
      </ul>

      {/* Sección inferior */}
      <div className="p-4 border-t border-white space-y-2">
        {token && (
          <SideBarDropItem
            text="Ajustes"
            items={configDrop}
            onClose={onClose} // ✅ corregido
          />
        )}

        {token && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-[#3c56a5] transition-colors w-full text-left"
          >
            <span>Cerrar Sesión</span>
          </button>
        )}
      </div>
    </div>
  );
}