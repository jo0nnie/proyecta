import { Link } from "react-router";
import { LoginForm } from "../../../components";

const LoginScreen = () => {
  return (
    <div className="flex h-screen">
      <div className="w-[1110px] bg-primary-500 flex justify-center items-center h-full">
        <img
          src="/Logo_PROYECTA_White.svg"
          alt="Logo Cohete"
          className="h-120 w-auto"
        />
      </div>

      <div className="w-[810px] bg-white flex flex-col justify-center items-center h-full">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-primary-500 mb-2">
            Accede a Proyecta
          </h2>
          <p className="text-primary-500 text-m">
            No tienes una cuenta?
            <Link
              to="/auth/register"
              className="text-primary-500 hover:underline"
            >
              Regístrate
            </Link>
          </p>

          {/*aqui luego irian las opciones para loguearse con google y email*/}
        </div>

        <div className="relative w-full my-8">
          <div className="h-[2px] bg-primary-500"></div>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-primary-500 font-medium">
            OR
          </span>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginScreen;
