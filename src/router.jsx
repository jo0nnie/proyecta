import { createBrowserRouter } from "react-router";
import { LoginScreen, RegisterScreen } from "./pages";
import AuthLayout from "./components/layouts/AuthLayout";
import Home from "./pages/Home/Home";
import Favoritos from "./pages/Favoritos/Favoritos";
import Historial from "./pages/Historial/Historial";
import Perfil from "./pages/Usuario/Perfil"
export const router = createBrowserRouter([
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginScreen /> },
      { path: "register", element: <RegisterScreen /> },
    ],
  },
  { path: "/", children: [{ index: true, element: <Home /> }] },
  {
    
    children: [
      { path: "/Favoritos", element: <Favoritos /> },
      { path: "/Historial", element: <Historial /> },
      { path: "/perfil", element: <Perfil /> },
    ],
  },

]);
