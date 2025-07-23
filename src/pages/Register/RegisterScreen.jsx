import { Link } from "react-router";
import { Button, TextField } from "../../components";

const RegisterScreen = () => {
  return <div className="flex h-screen justify-between">

    <div className="w-[1110px] bg-[#2C4692] flex justify-center items-center h-full">
      <img 
        src="/Logo PROYECTA White.svg" 
        alt="Logo Cohete"
        className="h-120 w-auto"
      />
    </div>
    <form className="bg-white w-[810px] flex flex-col gap-5 justify-center h-full font-[sans-serif] p-30">
        <div className="flex gap-5">
          <TextField
          label="Nombres"
          type="text"
          name="name"
          />
          <TextField
          label="Apellidos"
          type="text"
          name="name"
          />
        </div>
        <TextField
          label="Correo eléctronico"
          type="email"
          name="email"
          placeholder="ejemplo@proyecta.com"
        />
        <TextField
          label="Contraseña"
          type="password"
          name="password"
        />
        <TextField
          label="Confirme su contraseña"
          type="password"
          name="confirmPassword"
        />
        <Button
        type="submit"
        text="Registrarse"
        />
        <label className="flex justify-center gap-2">Ya tienes una cuenta?
          <Link to="/auth/login" className="underline"> Inicia sesión </Link>
        </label>
    </form>
  </div>
};

export default RegisterScreen;

