import { createBrowserRouter } from "react-router";
import { LoginScreen, RegisterScreen, AppScreen } from "./pages";
import AuthLayout from "./components/layouts/AuthLayout";
import Home from "./pages/Home/Home";
import Favoritos from "./pages/Favoritos/Favoritos";
import Historial from "./pages/Historial/Historial";
import PerfilUsuario from "./pages/Usuario/PerfilUsuario/PerfilUsuarioScreen";
import Ajustes from "./pages/Ajustes/Ajustes"
import PerfilEmprendimiento from "./pages/Emprendimientos/PerfilEmprendimiento/PerfilEmprendimientosScreen";
import Emprendimientos from "./pages/Emprendimientos/Emprendimientos";
import Categorias from "./pages/Categorias/Categorias";
import Pago from "./pages/Pago/Pago";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginScreen /> },
      { path: "register", element: <RegisterScreen /> },
    ],
  },

  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/favoritos",
    element: <Favoritos />,
  },
  {
    path: "/historial",
    element: <Historial />,
  },
  {
    path: "/perfil",
    element: <PerfilUsuario />,
  },
  {
    path: "/ajustes",
    element: <Ajustes />,
  },
  {path: "/categorias",
    element: <Categorias/>
  },
  {
    path: "/boosteo",
    element: <Pago />,
  },
  {
    path: "/emprendimientos",
    element: <Emprendimientos />,
  },
  {
    path: "/emprendimientos/:id",
    element: <PerfilEmprendimiento />,
  },
]);
