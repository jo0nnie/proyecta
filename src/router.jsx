import { createBrowserRouter } from "react-router";
import { LoginScreen, RegisterScreen, AppScreen } from "./pages";
import AuthLayout from "./components/layouts/AuthLayout";
import Home from "./pages/Home/Home";
import Favoritos from "./pages/Favoritos/Favoritos";
import Historial from "./pages/Historial/Historial";
import PerfilUsuario from "./pages/Usuario/PerfilUsuario/PerfilUsuarioScreen";
import PerfilEmprendimiento from "./pages/Emprendimientos/PerfilEmprendimiento/PerfilEmprendimientosScreen";
import Emprendimientos from "./pages/Emprendimientos/Emprendimientos";

export const router = createBrowserRouter([
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginScreen /> },
      { path: "register", element: <RegisterScreen /> },
    ],
  },
  {
    path: "/",
    children: [
      { path: "/favoritos", element: <Favoritos /> },
      { path: "/historial", element: <Historial /> },
      { path: "/perfil", element: <PerfilUsuario /> },
      { path: "/emprendimietos", element: <Emprendimientos /> },
    ],
  },
  {
    path: "/emprendimientos", // hice padre a esta ruta porque en la pro-49 se mergea el archivo Emprendimientos.jsx, y para que a futuro tener todas las subrutas de emprendimientos organizadas acá
    children: [
      {
        path: ":id", // esta ruta la puse para que reciba el id del emprendimiento y podamos mostrar el perfil específico 
        element: <PerfilEmprendimiento /> // el componente usa ese id para cargar y mostrar toda la info del emprendimiento 
      },
    ],
  },
]);
