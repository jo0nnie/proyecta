import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import AjusteItem from "../Ajustes/components/AjusteItem";
import { api } from "../../api/api";

const EditarPerfil = () => {
  const navegar = useNavigate();

  const [datosDelUsuario, setDatosDelUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    fechaNacimiento: "",
  });

  const [campoEnEdicion, setCampoEnEdicion] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Sesión expirada. Por favor, inicia sesión nuevamente.");
      navegar("/auth/login");
      return;
    }

    const cargarPerfil = async () => {
      try {
        const respuesta = await api.get("/usuarios/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const u = respuesta.data;
        setDatosDelUsuario({
          nombre: u.nombre || "",
          apellido: u.apellido || "",
          email: u.email,
          contrasena: "",
          fechaNacimiento: u.fechaNacimiento
            ? new Date(u.fechaNacimiento).toISOString().split("T")[0]
            : "",
        });
      } catch (error) {
        console.error(
          "Error al cargar el perfil:",
          error.response?.data || error.message
        );
        alert(error.response?.data?.msg || "Error al cargar el perfil");
        navegar("/perfil");
      } finally {
        setCargando(false);
      }
    };

    cargarPerfil();
  }, [navegar]);

  const manejarCambioEnCampo = (campo, valor) => {
    setDatosDelUsuario((prev) => ({ ...prev, [campo]: valor }));
  };

  const manejarClickEnGuardar = async (campo) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Sesión expirada");
      navegar("/auth/login");
      return;
    }

    const datosParaEnviar = {};

    if (campo === "contrasena") {
      if (!datosDelUsuario.contrasena.trim()) {
        alert("La contraseña no puede estar vacía");
        return;
      }
      datosParaEnviar.contrasena = datosDelUsuario.contrasena;
    } else if (campo === "fechaNacimiento" && datosDelUsuario.fechaNacimiento) {
      datosParaEnviar.fechaNacimiento = new Date(
        datosDelUsuario.fechaNacimiento
      ).toISOString();
    } else {
      datosParaEnviar[campo] = datosDelUsuario[campo];
    }

    try {
      await api.put("/usuarios/me", datosParaEnviar, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(`Campo "${campo}" actualizado correctamente`);
      setCampoEnEdicion(null);
    } catch (error) {
      console.error("Error al guardar:", error.response?.data || error.message);
      alert(error.response?.data?.msg || "Error al guardar los cambios");
    }
  };

  const manejarClickEnEliminarCuenta = async () => {
    if (!window.confirm("¿Estás seguro? Esta acción es irreversible.")) return;

    const token = localStorage.getItem("token");
    try {
      await api.delete("/usuarios/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Cuenta eliminada correctamente");
      localStorage.removeItem("token");
      navegar("/");
    } catch (error) {
      console.error(
        "Error al eliminar cuenta:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.msg || "Error al eliminar la cuenta");
    }
  };

  if (cargando) return <div className="text-center py-10">Cargando...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#2C4391] text-center mb-4">
        Editar Perfil
      </h1>

      {["nombre", "apellido", "email", "fechaNacimiento", "contrasena"].map(
        (campo) => (
          <AjusteItem
            key={campo}
            titulo={
              campo === "fechaNacimiento"
                ? "Fecha de nacimiento"
                : campo.charAt(0).toUpperCase() + campo.slice(1)
            }
          >
            {campoEnEdicion === campo ? (
              <input
                type={
                  campo === "contrasena"
                    ? "password"
                    : campo === "email"
                    ? "email"
                    : campo === "fechaNacimiento"
                    ? "date"
                    : "text"
                }
                value={datosDelUsuario[campo] || ""}
                onChange={(e) => manejarCambioEnCampo(campo, e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
              />
            ) : (
              <p>
                {campo === "contrasena"
                  ? "********"
                  : campo === "fechaNacimiento" && datosDelUsuario[campo]
                  ? new Date(datosDelUsuario[campo]).toLocaleDateString()
                  : datosDelUsuario[campo] || "No establecido"}
              </p>
            )}
            <div className="mt-2 flex justify-end">
              {campoEnEdicion === campo ? (
                <Button
                  text="Guardar"
                  onClick={() => manejarClickEnGuardar(campo)}
                />
              ) : (
                <Button
                  text="Editar"
                  onClick={() => setCampoEnEdicion(campo)}
                />
              )}
            </div>
          </AjusteItem>
        )
      )}

      <AjusteItem
        titulo="Eliminar cuenta"
        descripcion="Esta acción eliminará tu cuenta y todos tus datos. ¡Es irreversible!"
      >
        <div className="mt-2 flex justify-end">
          <Button
            text="Eliminar cuenta"
            onClick={manejarClickEnEliminarCuenta}
            className="bg-red-600 hover:bg-red-700"
          />
        </div>
      </AjusteItem>
    </div>
  );
};

export default EditarPerfil;
