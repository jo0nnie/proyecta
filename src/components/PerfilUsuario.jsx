import React from "react";
import { PiUserCircleFill } from "react-icons/pi";
import Button from "./Button";
import { Link } from "react-router-dom";
import CardEmprendimiento from "./CardEmprendimiento";
import BadgeBoost from "./BadgeBoost";

const PerfilUsuario = ({ usuario }) => {
  const {
    id,
    nombre = "",
    apellido = "",
    email,
    fechaNacimiento,
    estado,
    emprendimiento = [],
  } = usuario;

  const nombreCompleto =
    [nombre, apellido].filter(Boolean).join(" ") || "Usuario";
  const descripcion = "";

  const dateRegister = fechaNacimiento
    ? new Date(fechaNacimiento).toLocaleDateString()
    : "No especificada";

  return (
    <div className="border border-gray-300 p-4 m-auto my-4 rounded-lg max-w-4xl w-full">
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10 justify-between">
        <div className="flex-shrink-0">
          <PiUserCircleFill className="w-24 h-24 text-primary-500" />
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-gray-800">{nombreCompleto}</h2>
          {descripcion && <p className="text-gray-600 mt-1">{descripcion}</p>}
          <p className="text-gray-700">{email}</p>
        </div>

        <div className="self-start">
          <Link to={`/perfil/editar/${id}`}>
            <Button text="Editar Perfil" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col my-6 border-y border-[#2B4590] p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col">
            <p className="font-semibold text-[#2B4590] mb-2">
              Fecha de nacimiento:
            </p>
            <p className="text-[#666666]">{dateRegister}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="font-semibold text-[#2B4590] mb-3 ml-1">
          Mis emprendimientos:
        </p>

        {emprendimiento.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
            {emprendimiento.map((emp) => (
              <div key={emp.id} className="relative">
                <CardEmprendimiento
                  id={emp.id}
                  nombre={emp.nombre}
                  descripcion={emp.descripcion || "Sin descripción"}
                />
                {emp.id === 998 && (
                  <div className="absolute top-3 left-3">
                    <BadgeBoost isBoosted={true} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 ml-1">
            Todavía no tenés emprendimientos creados.
          </p>
        )}

        <Link to="/perfil/miemprendimiento" className="mt-4 self-start ml-1">
          <Button text="Crear Emprendimiento" />
        </Link>
      </div>
    </div>
  );
};

export default PerfilUsuario;
