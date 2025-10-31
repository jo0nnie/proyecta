import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "../../components";
import { useNavigate } from "react-router";
import { api } from "../../api/api.js";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    fechaNacimiento: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await api.post("/usuarios/registro", {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        contrasena: formData.password,
        fechaNacimiento: formData.fechaNacimiento,
      });

      alert("Usuario registrado correctamente");
      navigate("/auth/login");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      console.error(err);
      alert("Error al registrar usuario");
    }
  };
  return (
    <div className="flex h-screen justify-between">
      <div className="w-[1110px] bg-primary-500 flex justify-center items-center h-full">
        <img
          src="/Logo PROYECTA White.svg"
          alt="Logo Cohete"
          className="h-120 w-auto"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[810px] flex flex-col gap-5 justify-center h-full font-[sans-serif] p-30"
      >
        <div className="flex gap-5">
          <TextField
            label="Nombres"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <TextField
            label="Apellidos"
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
        </div>
        <TextField
          label="Fecha de Nacimiento"
          type="date"
          name="fechaNacimiento"
          placeholder="DD/MM/AAAA"
          value={formData.fechaNacimiento}
          onChange={handleChange}
        />
        <TextField
          label="Correo eléctronico"
          type="email"
          name="email"
          placeholder="ejemplo@proyecta.com"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          label="Confirme su contraseña"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit" text="Registrarse" />
        <label className="flex justify-center gap-2">
          Ya tienes una cuenta?
          <Link to="/auth/login" className="underline">
            {" "}
            Inicia sesión{" "}
          </Link>
        </label>
      </form>
    </div>
  );
};

export default RegisterScreen;
