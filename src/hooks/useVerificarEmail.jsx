import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { api } from "../api/api";
import { toast } from "react-toastify";

export const useVerificarEmail = () => {
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
                toast.success("Correo verificado correctamente");
                setTimeout(() => navigate("/"), 2000);
                navigate("/");
            } catch (error) {
                toast.error("Token inválido o expirado");
                navigate("/auth/login");
            } finally {
                setVerificando(false);
            }
        };

        verificar();
    }, []);

    return { verificando };
};