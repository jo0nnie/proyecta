import React from "react";
import { Outlet } from "react-router-dom";  

export default function AuthLayout(token) {
 // TODO agregar logica para autentificacion y rutas privadas
 
  return (
    <div>
      <Outlet />
    </div>
  );
}
