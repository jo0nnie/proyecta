import { useEffect, useState } from "react";
import PerfilUsuario from "../../components/PerfilUsuario";
import { api } from "../../api/api";

const PerfilUsuarioScreen = () => {
  const [datosDelUsuario, setDatosDelUsuario] = useState(null);
  const [estaCargando, setEstaCargando] = useState(true);
  const [mensajeDeError, setMensajeDeError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMensajeDeError("No estás autenticado");
      setEstaCargando(false);
      return;
    }

    const cargarPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        const respuesta = await api.get("/usuarios/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDatosDelUsuario(respuesta.data);
      } catch (error) {
        console.error(
          "Error al cargar el perfil:",
          error.response?.data || error.message
        );
        setMensajeDeError(
          error.response?.data?.msg || "Error al cargar el perfil"
        );
      } finally {
        setEstaCargando(false);
      }
    };

    cargarPerfil();
  }, []);

  if (estaCargando) return <div>Cargando perfil...</div>;
  if (mensajeDeError) return <div>Error: {mensajeDeError}</div>;
  if (!datosDelUsuario) return <div>Usuario no encontrado</div>;

  return <PerfilUsuario usuario={datosDelUsuario} />;
};

export default PerfilUsuarioScreen;
