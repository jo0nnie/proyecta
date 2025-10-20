import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import AjusteItem from '../Ajustes/components/AjusteItem';
import configuracionDeEntorno from '../../utils/envConstant.js';

// URL base de la API, obtenida desde el archivo de configuración
const URL_BASE_DE_LA_API = configuracionDeEntorno.API_URL;

/**
 * Componente que permite a un usuario autenticado ver y editar su perfil.
 * Carga los datos del usuario desde la API, permite modificar campos individuales
 * (nombre, apellido, email, fecha de nacimiento, contraseña) y eliminar la cuenta.
 * Cada campo se edita y guarda de forma independiente.
 */
const EditarPerfil = () => {
  // Obtiene el ID del usuario desde la URL (parámetro de ruta)
  const { id: identificadorDeUsuarioEnLaRuta } = useParams();
  const navegar = useNavigate();

  // Estado que almacena los datos actuales del usuario
  const [datosDelUsuario, setDatosDelUsuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
    fechaNacimiento: '',
  });

  // Indica qué campo está siendo editado actualmente (null = ninguno)
  const [campoEnEdicion, setCampoEnEdicion] = useState(null);

  // Indica si se está cargando la información del usuario
  const [cargando, setCargando] = useState(true);

  // Token de autenticación almacenado en localStorage
  const token = localStorage.getItem('token');

  /**
   * Efecto que se ejecuta al montar el componente o cuando cambia el ID, la navegación o el token.
   * Valida que el usuario esté autenticado y carga sus datos desde la API.
   */
  useEffect(() => {
    if (!token) {
      alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
      navegar('/auth/login');
      return;
    }

    const cargarDatosDelUsuario = async () => {
      try {
        const respuesta = await fetch(`${URL_BASE_DE_LA_API}/usuarios/${identificadorDeUsuarioEnLaRuta}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        let resultado;
        try {
          resultado = await respuesta.json();
        } catch {
          resultado = { msg: 'Error en la respuesta del servidor' };
        }

        if (!respuesta.ok) {
          throw new Error(resultado.msg || 'Usuario no encontrado');
        }

        const datosRecibidos = resultado.usuario;
        if (!datosRecibidos) {
          throw new Error('Datos del usuario no disponibles');
        }

        // Formatea la fecha de nacimiento para el input de tipo "date" (solo YYYY-MM-DD)
        setDatosDelUsuario({
          nombre: datosRecibidos.nombre || '',
          apellido: datosRecibidos.apellido || '',
          email: datosRecibidos.email,
          contrasena: '',
          fechaNacimiento: datosRecibidos.fechaNacimiento 
            ? new Date(datosRecibidos.fechaNacimiento).toISOString().split('T')[0]
            : '',
        });
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
        alert(error.message || 'Error al cargar el usuario');
        navegar('/perfil');
      } finally {
        setCargando(false);
      }
    };

    cargarDatosDelUsuario();
  }, [identificadorDeUsuarioEnLaRuta, navegar, token]);

  /**
   * Actualiza el valor de un campo específico en el estado del usuario.
   */
  const manejarCambioEnCampo = (nombreDelCampo, valorNuevo) => {
    setDatosDelUsuario((estadoPrevio) => ({ ...estadoPrevio, [nombreDelCampo]: valorNuevo }));
  };

  /**
   * Guarda los cambios de un campo específico en el backend.
   * Incluye validación de formato para el email y formateo correcto de la fecha.
   */
  const manejarClickEnGuardar = async (nombreDelCampo) => {
    if (!token) {
      alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
      navegar('/login');
      return;
    }

    // Validación de formato de email en el frontend
    if (nombreDelCampo === 'email') {
      const expresionRegularEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!expresionRegularEmail.test(datosDelUsuario.email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
      }
    }

    try {
      const datosParaEnviar = {};
      
      if (nombreDelCampo === 'contrasena') {
        if (!datosDelUsuario.contrasena) {
          alert('La contraseña no puede estar vacía');
          return;
        }
        datosParaEnviar.contrasena = datosDelUsuario.contrasena;
      } else if (nombreDelCampo === 'nombre') {
        datosParaEnviar.nombre = datosDelUsuario.nombre || null;
      } else if (nombreDelCampo === 'apellido') {
        datosParaEnviar.apellido = datosDelUsuario.apellido || null;
      } else if (nombreDelCampo === 'email') {
        datosParaEnviar.email = datosDelUsuario.email;
      } else if (nombreDelCampo === 'fechaNacimiento') {
        // Convierte la fecha a formato ISO completo (con hora) requerido por la base de datos
        if (datosDelUsuario.fechaNacimiento) {
          datosParaEnviar.fechaNacimiento = new Date(datosDelUsuario.fechaNacimiento).toISOString();
        } else {
          datosParaEnviar.fechaNacimiento = null;
        }
      }

      const respuesta = await fetch(`${URL_BASE_DE_LA_API}/usuarios/${identificadorDeUsuarioEnLaRuta}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(datosParaEnviar),
      });

      let resultado;
      try {
        resultado = await respuesta.json();
      } catch {
        resultado = { msg: 'Error al actualizar' };
      }

      if (!respuesta.ok) {
        throw new Error(resultado.msg || 'Error al actualizar');
      }

      const nombreCampoMostrar = nombreDelCampo === 'contrasena' ? 'Contraseña' : 
        nombreDelCampo.charAt(0).toUpperCase() + nombreDelCampo.slice(1);
      alert(`${nombreCampoMostrar} actualizada`);
      setCampoEnEdicion(null);
    } catch (error) {
      console.error('Error al guardar:', error);
      alert(error.message || 'Error al guardar los cambios');
    }
  };

  /**
   * Elimina la cuenta del usuario actual (o del usuario cuyo ID está en la URL).
   * Solicita confirmación, elimina la cuenta en el backend y limpia la sesión local.
   */
  const manejarClickEnEliminarCuenta = async () => {
    if (!token) {
      alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
      navegar('/auth/login');
      return;
    }

    if (!window.confirm('¿Estás seguro que quieres eliminar tu cuenta? Perderás todos tus datos. Esta acción es irreversible')) {
      return;
    }

    try {
      const respuesta = await fetch(`${URL_BASE_DE_LA_API}/usuarios/${identificadorDeUsuarioEnLaRuta}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      let resultado;
      try {
        resultado = await respuesta.json();
      } catch {
        resultado = { msg: 'Cuenta eliminada' };
      }

      if (!respuesta.ok) {
        throw new Error(resultado.msg || 'Error al eliminar la cuenta');
      }

      alert('Tu cuenta y todos tus datos han sido eliminados.');
      localStorage.removeItem('token');
      localStorage.removeItem('usuarioId');
      navegar('/');
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert(error.message || 'Error al eliminar la cuenta');
    }
  };

  // Muestra un indicador de carga mientras se obtienen los datos
  if (cargando) return <div className="text-center py-10">Cargando...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#2C4391] text-center">Editar Perfil</h1>

      <AjusteItem titulo="Nombre">
        {campoEnEdicion === "nombre" ? (
          <input
            type="text"
            value={datosDelUsuario.nombre}
            onChange={(evento) => manejarCambioEnCampo('nombre', evento.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 w-full"
          />
        ) : (
          <p>{datosDelUsuario.nombre || 'No establecido'}</p>
        )}
        <div className="mt-2 flex justify-end">
          {campoEnEdicion === "nombre" ? (
            <Button text="Guardar" onClick={() => manejarClickEnGuardar("nombre")} />
          ) : (
            <Button text="Editar" onClick={() => setCampoEnEdicion("nombre")} />
          )}
        </div>
      </AjusteItem>

      <AjusteItem titulo="Apellido">
        {campoEnEdicion === "apellido" ? (
          <input
            type="text"
            value={datosDelUsuario.apellido}
            onChange={(evento) => manejarCambioEnCampo('apellido', evento.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 w-full"
          />
        ) : (
          <p>{datosDelUsuario.apellido || 'No establecido'}</p>
        )}
        <div className="mt-2 flex justify-end">
          {campoEnEdicion === "apellido" ? (
            <Button text="Guardar" onClick={() => manejarClickEnGuardar("apellido")} />
          ) : (
            <Button text="Editar" onClick={() => setCampoEnEdicion("apellido")} />
          )}
        </div>
      </AjusteItem>

      <AjusteItem titulo="Correo electrónico">
        {campoEnEdicion === "email" ? (
          <input
            type="email"
            value={datosDelUsuario.email}
            onChange={(evento) => manejarCambioEnCampo('email', evento.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 w-full"
          />
        ) : (
          <p>{datosDelUsuario.email}</p>
        )}
        <div className="mt-2 flex justify-end">
          {campoEnEdicion === "email" ? (
            <Button text="Guardar" onClick={() => manejarClickEnGuardar("email")} />
          ) : (
            <Button text="Editar" onClick={() => setCampoEnEdicion("email")} />
          )}
        </div>
      </AjusteItem>

      <AjusteItem titulo="Fecha de nacimiento">
        {campoEnEdicion === "fechaNacimiento" ? (
          <input
            type="date"
            value={datosDelUsuario.fechaNacimiento}
            onChange={(evento) => manejarCambioEnCampo('fechaNacimiento', evento.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 w-full"
          />
        ) : (
          <p>{datosDelUsuario.fechaNacimiento ? new Date(datosDelUsuario.fechaNacimiento).toLocaleDateString() : 'No establecida'}</p>
        )}
        <div className="mt-2 flex justify-end">
          {campoEnEdicion === "fechaNacimiento" ? (
            <Button text="Guardar" onClick={() => manejarClickEnGuardar("fechaNacimiento")} />
          ) : (
            <Button text="Editar" onClick={() => setCampoEnEdicion("fechaNacimiento")} />
          )}
        </div>
      </AjusteItem>

      <AjusteItem titulo="Contraseña">
        {campoEnEdicion === "contrasena" && (
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={datosDelUsuario.contrasena}
            onChange={(evento) => manejarCambioEnCampo('contrasena', evento.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 w-full"
          />
        )}
        <div className="mt-2 flex justify-end">
          {campoEnEdicion === "contrasena" ? (
            <Button text="Guardar" onClick={() => manejarClickEnGuardar("contrasena")} />
          ) : (
            <Button text="Editar" onClick={() => setCampoEnEdicion("contrasena")} />
          )}
        </div>
      </AjusteItem>

      <AjusteItem
        titulo="Eliminar cuenta"
        descripcion="Esta acción eliminará tu cuenta y todos tus datos, incluyendo emprendimientos. ¡Es irreversible!"
      >
        <div className="mt-2 flex justify-end">
          <Button
            text="Eliminar cuenta"
            onClick={manejarClickEnEliminarCuenta}
            className="bg-red-600 hover:bg-red-700"
          />
        </div>
      </AjusteItem>
    </div>
  );
};

export default EditarPerfil;