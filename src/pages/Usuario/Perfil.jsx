import PerfilUsuario from "../../components/PerfilUsuario";


const Perfil = () => {
  const user = {
    foto: "", 
    nombre: "Guille Viera",
    descripcion: "Testeando perfil de usuario",
    correo: "guille@gmail.com",
    ciudad: "Misiones",
    dateRegister: "9/07/2025",
    lastLog: "09/07/2025"
  };

  return (
    <div className="max-w-screen-md mx-auto mt-10">
      <PerfilUsuario
        foto={user.foto}
        nombre={user.nombre}
        descripcion={user.descripcion}
        correo={user.correo}
        ciudad={user.ciudad}
        dateRegister={user.dateRegister}
        lastLog={user.lastLog}
      />
    </div>
  );
};

export default Perfil;
