import { Navigate } from "react-router";
import { createBrowserRouter } from "react-router";
import Home from "./pages/Home/Home";
import { LoginScreen, RegisterScreen, AppScreen } from "./pages";
import AuthLayout from "./components/layouts/AuthLayout";


export default function RouteNameProvider({ location, element }) {
        let title = titles[location.pathname] || "Proyecta";
        if (!location) {
          tittle = "Proyecta";
          element = <Home />;
        } else if (location.pathname === "/auth/login") {
          title = "Iniciar Sesión";
          element = <LoginScreen />;
        } else if (location.pathname === "/auth/register") {
          title = "Registrarse";
          element = <RegisterScreen />;
        }

}
