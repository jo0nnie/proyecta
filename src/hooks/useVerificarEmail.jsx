import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { api } from "../api/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slice/authSlice";
export const useVerificarEmail = () => {
    const dispatch = useDispatch
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [verificando, setVerificando] = useState(true);

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            toast.error("Token de verificación no encontrado");
            navigate("/auth/login");
            return;
        }

        const verificar = async () => {
            try {
                await api.get(`/auth/verificar-email?token=${token}`);
                dispatch(setCredentials({
                    token: res.data.token,
                    usuario: res.data.usuario,
                }));
                toast.success("Correo verificado correctamente");
                setTimeout(() => navigate("/"), 2000);
            } catch (error) {
                toast.error("Token inválido o expirado");
                navigate("/");
            } finally {
                setVerificando(false);
            }
        };

        verificar();
    }, [searchParams, navigate]);

    return { verificando };
};