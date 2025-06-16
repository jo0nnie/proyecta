import React from "react";
import Button from "./Button";

export default function NavBar() {
  return (
    <nav className="bg-[#2C4391] px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo con texto y cohete */}
      <div className="flex items-center space-x-2">
        <div className="text-white font-bold text-lg flex items-center">
          <span className="text-xl mr-2"></span>
          <span>PROYECTA</span>
        </div>
      </div>

      {/* input de búsqueda falta logica*/}
      <div className="flex-1 mx-6 max-w-[600px] relative">
        <input
          type="text"
          placeholder="Buscar"
          className="w-full py-2 px-4 pl-5 pr-10 rounded-full bg-[#E9E2EF] text-[#2C4391] placeholder-[#2C4391] focus:outline-none"
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#2C4391] text-sm pointer-events-none">
          
        </span>
      </div>

      {/* Botones + ícono de usuario */}
      <div className="flex items-center space-x-3">
        <Button text="Iniciar Sesión" type="button" />
        <Button text="Registrarse" type="button" />
        {/* aca iria logo */}
        <span className="text-white text-2xl ml-2"></span>
      </div>
    </nav>
  );
}
