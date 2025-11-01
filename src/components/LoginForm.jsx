import { useNavigate } from "react-router-dom";
import Container from "./Container";
import TextField from "./TextField";
import Button from "./Button";
import { api } from "../api/api.js"; // instancia de Axios
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slice/authSlice.js"
export default function LoginForm({ title }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    const formData = new FormData(evento.target);
    const data = {
      email: formData.get("email"),
      contrasena: formData.get("password"), // backend espera 'contrasena'
    };

    try {
      const res = await api.post("/usuarios/login", data);

      dispatch(setCredentials({
        token: res.data.token,
        user: res.data.usuario,
      }));


      toast.success("Bienvenido");
      navigate("/"); // redirige a la página principal
    } catch (error) {
      const mensaje = error.response?.data?.error || "Usuario y/o contraseña incorrectos";
      toast.error(mensaje);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <h3 className="text-[#2C4692] text-2xl font-medium">{title}</h3>
        <TextField
          label="Correo Eléctronico"
          type="email"
          name="email"
          placeholder="ejemplo@proyecta.com"
        />
        <TextField
          label="Contraseña"
          type="password"
          name="password"
          placeholder="********"
        />
        <Button type="submit" text="Iniciar sesión" />
      </form>
    </Container>
  );
}
