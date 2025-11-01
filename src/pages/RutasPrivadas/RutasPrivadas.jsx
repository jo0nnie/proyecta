import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function RutasPrivadas({ children, rolesPermitidos }) {
  const token = useSelector((state) => state.auth.token);
  const usuario = useSelector((state) => state.auth.usuario);

  if (!token || !usuario) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
}