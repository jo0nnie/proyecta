import { useNavigate } from "react-router-dom";
import Container from "./Container";
import TextField from "./TextField";
import Button from "./Button";
import { api, setAuthToken } from "../api/api.js"; // instancia de Axios
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slice/authSlice.js"
import { setFavoritos } from "../store/slice/favoritosSlice.js";
export default function LoginForm({ title }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    const formData = new FormData(evento.target);
    const data = {
      email: formData.get("email"),
      contrasena: formData.get("password"),
    };

    try {
      const res = await api.post("/usuarios/login", data);
      const { token, usuario } = res.data;

      dispatch(setCredentials({ token, usuario }));
      setAuthToken(token);
      // para restaurar favs
      const resFavoritos = await api.get("/favoritos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setFavoritos(resFavoritos.data));

      toast.success("Bienvenido");
      console.log("Usuario logueado:", usuario);
      navigate("/");
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
