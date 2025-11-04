import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../api/api";
import { setUsuario } from "../store/slice/authSlice";

export const usePerfilUsuario = () => {
  const token = useSelector((state) => state.auth.token);
  const usuarioGlobal = useSelector((state) => state.auth.usuario);
  const dispatch = useDispatch();

  const [usuario, setUsuarioLocal] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("No estás autenticado");
      setCargando(false);
      return;
    }

    const cargarPerfil = async () => {
      try {
        const respuesta = await api.get("/usuarios/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsuarioLocal(respuesta.data.usuario);
        dispatch(setUsuario(respuesta.data.usuario));
      } catch (err) {
        console.error("Error al cargar el perfil:", err.response?.data || err.message);
        setError(err.response?.data?.msg || "Error al cargar el perfil");
      } finally {
        setCargando(false);
      }
    };

    if (usuarioGlobal) {
      setUsuarioLocal(usuarioGlobal);
      setCargando(false);
    } else {
      cargarPerfil();
    }
  }, [token, usuarioGlobal, dispatch]);

  return { usuario, cargando, error };
};