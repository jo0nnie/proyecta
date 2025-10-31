import { useState } from "react";
import AjusteItem from "../Ajustes/components/AjusteItem";

export default function EditarPerfil() {

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary-400 text-center">
        Editar Perfil
      </h1>

      <div className="ml-7 mr-7">
        <div className="border-b border-primary-500 pt-7"></div>
      </div>

      <AjusteItem
        titulo="Cambiar nombre"
        descripcion="Escribí tu nuevo nombre"
        textoBoton="Cambiar nombre"
      />

      <AjusteItem
        titulo="Cambiar contraseña"
        descripcion="Cambia la contraseña de tu cuenta desde acá"
        textoBoton="Cambiar contraseña"
      />

      <AjusteItem
        titulo="Cambiar email"
        descripcion="Actualiza tu correo electrónico principal"
        textoBoton="Cambiar email"
      />
      <AjusteItem
        titulo="Eliminar cuenta"
        descripcion="Esta acción borrará únicamente su cuenta sin afectar a su emprendimiento"
        textoBoton="Eliminar"
        colorBoton="#060F2A"
      />

      <AjusteItem
        titulo="Eliminar todo"
        descripcion="Esta acción borrará TODOS los datos de la cuenta, incluyendo emprendimientos"
        textoBoton="Eliminar TODO"
        colorBoton="#060F2A"
      />
    </div>
  );
}
