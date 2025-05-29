import { createBrowserRouter } from "react-router";
import { LoginScreen, RegisterScreen, AppScreen } from "./pages";
import AuthLayout from "./components/layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginScreen /> },
      { path: "register", element: <RegisterScreen /> },
    ],
  },
  { path: "/", children: [{ index: true, element: <AppScreen /> }] },
]);
