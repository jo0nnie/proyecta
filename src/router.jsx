import { createBrowserRouter } from "react-router";
import { VerificarEmailScreen,RutasPrivadas, AjustesScreen, CategoriasScreen, EmprendimientosScreen, FavoritosScreen, HistorialScreen, HomeScreen, LoginScreen, PagoScreen, PerfilEmprendimientosScreen, PerfilUsuarioScreen, RegisterScreen, CrearEmprendimientoScreen, DashboardScreen, MetodosdePagoScreen, PlanesScreen } from "./pages";
import AuthLayout from "./components/layouts/AuthLayout";
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import EditarPerfil from "./pages/PerfilUsuario/EditarPerfilUsuarioScreen";
import { ROLES } from './constants/roles'
import CrearPlan from "./pages/Admin/CrearPlan/CrearPlan";



export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginScreen /> },
      { path: "register", element: <RegisterScreen /> },
      { path: "verificar-email", element: <VerificarEmailScreen /> },
    ],
  },

  {
    element: <MainLayout />,
    children: [
      // rutas sin auth
      {
        path: "/",
        element: <EmprendimientosScreen />,
      },
      {
        path: "/sobre-nosotros",
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
        // rutas auth Usuario normal...
        element: <AuthLayout />,
        children: [
          {
            path: "/favoritos",
            element:
              (<RutasPrivadas rolesPermitidos={[ROLES.USUARIO,ROLES.ADMIN]}>
                <FavoritosScreen />,
              </RutasPrivadas>)
          },
          {
            path: "/historial",
             element:
              (<RutasPrivadas rolesPermitidos={[ROLES.USUARIO,ROLES.ADMIN]}>
                <HistorialScreen />,
              </RutasPrivadas>)
          },
          {
            path: "/perfil",
              element:
              (<RutasPrivadas rolesPermitidos={[ROLES.USUARIO,ROLES.ADMIN]}>
                <PerfilUsuarioScreen />,
              </RutasPrivadas>),
          },
          {
            path: "/perfil/miemprendimiento",
            element: <CrearEmprendimientoScreen />,
          },
          {
            path: "/perfil/editar",
              element:
              (<RutasPrivadas rolesPermitidos={[ROLES.USUARIO,ROLES.ADMIN]}>
                <EditarPerfil />,
              </RutasPrivadas>),
          },
          {
            path: "/ajustes",
              element:
              (<RutasPrivadas rolesPermitidos={[ROLES.USUARIO,ROLES.ADMIN]}>
                <AjustesScreen />,
              </RutasPrivadas>)
          },
          {
            path: "/carrito",
           element: (
              <RutasPrivadas rolesPermitidos={[ROLES.USUARIO, ROLES.ADMIN]}>
              
              <PagoScreen />,
              </RutasPrivadas>
            ),
          },
          {
            path: "/dashboard",
            element: (
              <RutasPrivadas rolesPermitidos={[ROLES.USUARIO, ROLES.ADMIN]}>
              
          <DashboardScreen/>,
              </RutasPrivadas>
            ),
          },
          {
            path: "/infoplanes",
            element: <PlanesScreen />,
          },
          {
            path: "/metodosdepago",
              element:
              (<RutasPrivadas rolesPermitidos={[ROLES.USUARIO,ROLES.ADMIN]}>
                <MetodosdePagoScreen />,
              </RutasPrivadas>),
          },
          {
            path: "/dashboard",
              element:
              (<RutasPrivadas rolesPermitidos={ROLES.ADMIN}>
                <DashboardScreen />,
              </RutasPrivadas>),
          },
          {
            path: "/crear-plan",
              element:
              (<RutasPrivadas rolesPermitidos={ROLES.ADMIN}>
                <CrearPlan />,
              </RutasPrivadas>),
          },
          
        ],
      },
    ],
  },
]);
