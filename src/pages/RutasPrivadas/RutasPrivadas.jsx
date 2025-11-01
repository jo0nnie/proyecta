import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function RutasPrivadas({ children, rolesPermitidos }) {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  if (!token || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!rolesPermitidos.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
}