import PerfilUsuario from "../../components/PerfilUsuario";
import { usePerfilUsuario } from "../../hooks/usePerfilUsuario";
const PerfilUsuarioScreen = () => {
  const { usuario, cargando, error } = usePerfilUsuario();

  if (cargando) return <div>Cargando perfil...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!usuario) return <div>Usuario no encontrado</div>;

  return <PerfilUsuario usuario={usuario} />;
};

export default PerfilUsuarioScreen;