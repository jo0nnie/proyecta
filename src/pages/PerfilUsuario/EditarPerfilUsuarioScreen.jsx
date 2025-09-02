import { useState } from "react";
import { Button } from "../../components";
import AjusteItem from "../Ajustes/components/AjusteItem";

export default function EditarPerfil() {
  const [editingField, setEditingField] = useState(null);

  const handleEditClick = (field) => setEditingField(field);
  const handleSaveClick = (message) => {
    alert(message);
    setEditingField(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#2C4391] text-center">
        Editar Perfil
      </h1>

      <AjusteItem titulo="Cambiar nombre" descripcion="Escribí tu nuevo nombre">
        {editingField === "nombre" && (
          <input
            type="text"
            placeholder="Ej. Manuel Alejandro"
            className="border border-gray-300 rounded-md px-2 py-1 w-full"
          />
        )}
        <div className="mt-2 flex justify-end">
          {editingField === "nombre" ? (
            <Button text="Guardar" onClick={() => handleSaveClick("Nombre actualizado")} />
          ) : (
            <Button text="Editar" onClick={() => handleEditClick("nombre")} />
          )}
        </div>
      </AjusteItem>

      <AjusteItem titulo="Cambiar foto" descripcion="Seleccioná una nueva foto de perfil">
        {editingField === "foto" && (
          <input
            type="file"
            className="border border-gray-300 rounded-md px-2 py-1 w-full text-sm"
          />
        )}
        <div className="mt-2 flex justify-end">
          {editingField === "foto" ? (
            <Button text="Guardar" onClick={() => handleSaveClick("Foto actualizada")} />
          ) : (
            <Button text="Editar" onClick={() => handleEditClick("foto")} />
          )}
        </div>
      </AjusteItem>

      <AjusteItem titulo="Cambiar contraseña" descripcion="Cambia la contraseña de tu cuenta desde acá">
        {editingField === "contraseña" && (
          <input
            type="password"
            placeholder="Escribe tu nueva contraseña"
            className="border border-gray-300 rounded-md px-2 py-1 w-full"
          />
        )}
        <div className="mt-2 flex justify-end">
          {editingField === "contraseña" ? (
            <Button text="Guardar" onClick={() => handleSaveClick("Contraseña actualizada")} />
          ) : (
            <Button text="Editar" onClick={() => handleEditClick("contraseña")} />
          )}
        </div>
      </AjusteItem>

      <AjusteItem titulo="Cambiar email" descripcion="Actualiza tu correo electrónico principal">
        {editingField === "email" && (
          <input
            type="email"
            placeholder="ejemplo@correo.com"
            className="border border-gray-300 rounded-md px-2 py-1 w-full"
          />
        )}
        <div className="mt-2 flex justify-end">
          {editingField === "email" ? (
            <Button text="Guardar" onClick={() => handleSaveClick("Email actualizado")} />
          ) : (
            <Button text="Editar" onClick={() => handleEditClick("email")} />
          )}
        </div>
      </AjusteItem>

      <AjusteItem
        titulo="Eliminar cuenta"
        descripcion="Esta acción borrará únicamente su cuenta sin afectar a su emprendimiento"
      >
        <div className="mt-2 flex justify-end">
          <Button
            text="Eliminar cuenta"
            onClick={() => {
              if (window.confirm("¿Estás seguro de que quieres eliminar tu cuenta?")) {
                alert("Cuenta eliminada");
              }
            }}
          />
        </div>
      </AjusteItem>

      <AjusteItem
        titulo="Eliminar todo"
        descripcion="Esta acción eliminará TODOS los datos de la cuenta, incluyendo emprendimientos"
      >
        <div className="mt-2 flex justify-end">
          <Button
            text="Eliminar todo"
            onClick={() => {
              if (
                window.confirm(
                  "¡Esta acción es irreversible! ¿Estás seguro de que queres eliminar TODOS tus datos?"
                )
              ) {
                alert("Todos los datos eliminados");
              }
            }}
          />
        </div>
      </AjusteItem>
    </div>
  );
}
