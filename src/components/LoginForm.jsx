import { useNavigate } from "react-router-dom";
import Container from "./Container";
import TextField from "./TextField";
import Button from "./Button";
import { api } from "../api/api.js"; // instancia de Axios

export default function LoginForm({ title }) {
  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    const formData = new FormData(evento.target);
    const data = {
      email: formData.get("email"),
      contrasena: formData.get("password"), // backend espera 'contrasena'
    };

    try {
      const res = await api.post("api/usuarios/login", data);

      // Guardamos usuario y token en localStorage
      localStorage.setItem("user", JSON.stringify(res.data.usuario));
      localStorage.setItem("token", res.data.token);

      alert("Login exitoso ✅");
      navigate("/"); // redirige a la página principal
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Usuario y/o contraseña incorrectos ❌");
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
