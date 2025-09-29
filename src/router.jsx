import { createBrowserRouter } from "react-router";
import { AjustesScreen, CategoriasScreen, EmprendimientosScreen, FavoritosScreen, HistorialScreen, HomeScreen, LoginScreen, PagoScreen, PerfilEmprendimientosScreen, PerfilUsuarioScreen, RegisterScreen, CrearEmprendimientoScreen, DashboardScreen, MetodosdePagoScreen, PlanesScreen } from "./pages";
import AuthLayout from "./components/layouts/AuthLayout";
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import EditarPerfil from "./pages/PerfilUsuario/EditarPerfilUsuarioScreen";


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
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      { path: "/categorias", element: <CategoriasScreen /> },
      {
        path: "/emprendimientos",
        element: <EmprendimientosScreen />,
      },
      {
        path: "/emprendimientos/:id",
        element: <PerfilEmprendimientosScreen />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/favoritos",
            element: <FavoritosScreen />,
          },
          {
            path: "/historial",
            element: <HistorialScreen />,
          },
          {
            path: "/perfil",
            element: <PerfilUsuarioScreen />,
          },
          {
            path: "/perfil/miemprendimiento",
            element: <CrearEmprendimientoScreen />,
          },
          {
            path: "/perfil/editarperfil",
            element: <EditarPerfil />,
          },
          {
            path: "/ajustes",
            element: <AjustesScreen />,
          },
          {
            path: "/boosteo",
            element: <PagoScreen />,
          },
          {
            path: "/dashboard",
            element: <DashboardScreen />,
          },
          {
            path: "/infoplanes",
            element: <PlanesScreen />,
          },
          {
            path: "/metodosdepago",
            element: <MetodosdePagoScreen />,
          },

        ],
      },
    ],
  },
]);
