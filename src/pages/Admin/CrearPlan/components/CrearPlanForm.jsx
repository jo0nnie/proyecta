import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { api } from "../../../../api/api";
import { TextField, Button } from "../../../../components";

export default function CrearPlanForm() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const [enviando, setEnviando] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        duracionDias: "",
        precio: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid = () => {
        return (
            formData.nombre.trim() &&
            formData.descripcion.trim() &&
            formData.duracionDias &&
            formData.precio
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            toast.warn("Por favor completá todos los campos obligatorios.");
            return;
        }

        setEnviando(true);

        try {
            const response = await api.post("/planes",
                {
                    nombre: formData.nombre.trim(),
                    descripcion: formData.descripcion.trim(),
                    duracionDias: Number(formData.duracionDias),
                    precio: parseFloat(formData.precio),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response)
            toast.success("¡Plan creado con éxito!");
            setFormData({
                nombre: "",
                descripcion: "",
                duracionDias: "",
                precio: "",
            });
            navigate("/infoplanes");
        } catch (error) {
            console.error("Error en el envío:", error.response?.data || error.message);
            const mensaje =
                error.response?.data?.msg ||
                error.response?.data?.error ||
                "Hubo un problema al enviar el formulario.";
            toast.error(mensaje);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <TextField
                label="Nombre del plan *"
                type="text"
                name="nombre"
                placeholder="Nombre del plan"
                value={formData.nombre}
                onChange={handleChange}
                required={true}
            />

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="descripcion"
                    className="text-primary-500 text-size-base font-medium"
                >
                    Descripción *
                </label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Beneficios del plan"
                    className="border-2 border-primary-500 rounded-[10px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2C4692]"
                    required
                />
            </div>

            <TextField
                label="Duración en días"
                type="number"
                name="duracionDias"
                placeholder="Escribí la duración en días"
                value={formData.duracionDias}
                onChange={handleChange}
                required={true}
            />

            <TextField
                label="Precio *"
                type="number"
                name="precio"
                placeholder="Escribí el precio"
                step="any"
                value={formData.precio}
                onChange={handleChange}
                required={true}
            />

            <Button
                type="submit"
                text={enviando ? "Enviando" : "Crear"}
                disabled={enviando}
            />
        </form>
    );
}