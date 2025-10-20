// src/screens/PerfilUsuarioScreen.jsx
import { useEffect, useState } from 'react';
import PerfilUsuario from '../../components/PerfilUsuario';
import { useParams } from 'react-router-dom';
import envConstant from '../../utils/envConstant';

// Obtiene la URL base de la API desde la configuración de entorno
const API_URL = envConstant.API_URL;

const PerfilUsuarioScreen = () => {
  const { id: identificadorDeUsuarioEnLaRuta } = useParams();

  const [datosDelUsuario, setDatosDelUsuario] = useState(null);

  const [estaCargando, setEstaCargando] = useState(true);

  const [mensajeDeError, setMensajeDeError] = useState(null);

  /**
   * Efecto que se ejecuta cuando cambia el ID en la URL.
   * Valida el ID, realiza la petición a la API y actualiza el estado correspondiente.
   */
  useEffect(() => {
    // Convierte el ID de string a número 
    const identificadorNumerico = Number(identificadorDeUsuarioEnLaRuta);
    if (!identificadorNumerico || identificadorNumerico <= 0) {
      setMensajeDeError('ID de usuario inválido');
      setEstaCargando(false);
      return;
    }

    const cargarDatosDelUsuario = async () => {
      try {
        // Realiza la petición a la API usando la URL base configurada
        const respuesta = await fetch(`${API_URL}/usuarios/${identificadorNumerico}`);
        
        if (!respuesta.ok) {
          const textoDelError = await respuesta.text();
          throw new Error(`Error ${respuesta.status}: ${textoDelError}`);
        }

        const datosRecibidos = await respuesta.json();

        // Verifica que la respuesta contenga el objeto "usuario"
        if (!datosRecibidos.usuario) {
          throw new Error('Respuesta inválida: falta el campo "usuario"');
        }

        // Guarda los datos del usuario en el estado
        setDatosDelUsuario(datosRecibidos.usuario);
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
        setMensajeDeError(error.message);
      } finally {
        setEstaCargando(false);
      }
    };

    cargarDatosDelUsuario();
  }, [identificadorDeUsuarioEnLaRuta]);

  if (estaCargando) return <div>Cargando perfil...</div>;

  if (mensajeDeError) return <div>Error: {mensajeDeError}</div>;

  if (!datosDelUsuario) return <div>Usuario no encontrado</div>;

  return <PerfilUsuario usuario={datosDelUsuario} />;
};

export default PerfilUsuarioScreen;