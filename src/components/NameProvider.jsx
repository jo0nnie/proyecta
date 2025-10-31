import { Navigate } from "react-router";
import { createBrowserRouter } from "react-router";
import Home from "./pages/Home/Home";
import { LoginScreen, RegisterScreen, AppScreen } from "./pages";
import AuthLayout from "./components/layouts/AuthLayout";

// TODO este componente no se usa, tampoco es un provider y si lo fuera no esta en la carpeta correcta
export default function RouteNameProvider({ location, element }) {
        let title = titles[location.pathname] || "Proyecta";
        if (!location) {
          title = "Proyecta";
          element = <Home />;
        } else if (location.pathname === "/auth/login") {
          title = "Iniciar Sesión";
          element = <LoginScreen />;
        } else if (location.pathname === "/auth/register") {
          title = "Registrarse";
          element = <RegisterScreen />;
        }

}
