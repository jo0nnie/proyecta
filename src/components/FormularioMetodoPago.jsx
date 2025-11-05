import { useState, useEffect } from "react";
import Button from "./Button";
import TextField from "./TextField";
import { api } from "../api/api";
import { toast } from "react-toastify";

export default function FormularioMetodoPago({
    token,
    metodoInicial = null,
    editandoId = null,
    onSuccess = () => { },
    onCancel = () => { },
}) {
    const [formData, setFormData] = useState({
        nombreDelTitular: "",
        numero: "",
        tipoTarjeta: "",
        vencimiento: "",
        cvc: "",
    });

    useEffect(() => {
        if (metodoInicial) {
            const fecha = new Date(metodoInicial.vencimiento);
            const mm = String(fecha.getMonth() + 1).padStart(2, "0");
            const yy = String(fecha.getFullYear()).slice(-2);
            const vencimientoStr = `${mm}/${yy}`;
            const numeroConEspacios = metodoInicial.numero.replace(/(\d{4})/g, "$1 ").trim();

            setFormData({
                nombreDelTitular: metodoInicial.nombreDelTitular,
                numero: numeroConEspacios,
                tipoTarjeta: metodoInicial.tipoTarjeta,
                vencimiento: vencimientoStr,
                cvc: "",
            });
        }
    }, [metodoInicial]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "numero") {
            const soloDigitos = value.replace(/\D/g, "");
            const conEspacios = soloDigitos.replace(/(\d{4})(?=\d)/g, "$1 ");
            setFormData((prev) => ({ ...prev, numero: conEspacios }));
        } else if (name === "vencimiento") {
            const formateado = formatVencimiento(value);
            setFormData((prev) => ({ ...prev, vencimiento: formateado }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const formatVencimiento = (value) => {
        const cleaned = value.replace(/\D/g, "");
        const limited = cleaned.slice(0, 4);
        if (limited.length >= 3) {
            return `${limited.slice(0, 2)}/${limited.slice(2)}`;
        }
        return limited;
    };

    const vencimientoValido = (mmYy) => {
        const [mm, yy] = mmYy.split("/");
        const mes = parseInt(mm, 10);
        const anio = parseInt(yy, 10);
        const ahora = new Date();
        const anioActual = parseInt(String(ahora.getFullYear()).slice(-2), 10);
        const mesActual = ahora.getMonth() + 1;

        if (!mm || !yy || mm.length !== 2 || yy.length !== 2) return false;
        if (mes < 1 || mes > 12) return false;
        if (anio < anioActual || (anio === anioActual && mes < mesActual)) return false;

        return true;
    };

    const convertirVencimiento = (mmYy) => {
        const [mm, yy] = mmYy.split("/");
        if (!mm || !yy || mm.length !== 2 || yy.length !== 2) return null;
        return `20${yy}-${mm}-01`;
    };

    const handleSubmit = async () => {
        const { nombreDelTitular, numero, tipoTarjeta, vencimiento, cvc } = formData;

        if (!nombreDelTitular || !numero || !tipoTarjeta || !vencimiento || !cvc) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        const numeroLimpio = numero.replace(/\s/g, "");
        if (numeroLimpio.length !== 16) {
            toast.error("El número de tarjeta debe tener 16 dígitos.");
            return;
        }

        const vencimientoISO = convertirVencimiento(vencimiento);
        if (!vencimientoISO || !vencimientoValido(vencimiento)) {
            toast.error("Vencimiento inválido. Usá un mes entre 01 y 12 y un año válido.");
            return;
        }
        if (!/^\d{3}$/.test(cvc)) {
            toast.error("El CVC debe tener exactamente 3 dígitos.");
            return;
        }
        const payload = {
            nombreDelTitular,
            numero: numeroLimpio,
            tipoTarjeta,
            vencimiento: vencimientoISO,
            cvc,
        };

        try {
            if (editandoId) {
                await api.put(`/metodos-de-pago/${editandoId}`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Método actualizado.");
            } else {
                await api.post("/metodos-de-pago", payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Método creado.");
            }

            onSuccess();
            setFormData({
                nombreDelTitular: "",
                numero: "",
                tipoTarjeta: "",
                vencimiento: "",
                cvc: "",
            });
        } catch (error) {
            const msg = error.response?.data?.msg || "Error al guardar el método de pago.";
            toast.error(msg);
        }
    };

    return (
        <div className="mt-6 p-4 rounded border shadow-md max-w-md flex-grow ml-8">
            <h3 className="text-[#2C4391] mb-3 text-center font-bold">
                {editandoId ? "Editar Método de Pago" : "Nuevo Método de Pago"}
            </h3>

            <p className="text-black pb-1">Titular</p>
            <TextField
                name="nombreDelTitular"
                value={formData.nombreDelTitular}
                onChange={handleInputChange}
                className="border p-2 mb-2 block w-full"
            />

            <p className="text-black pb-1">Tipo de tarjeta</p>
            <select
                name="tipoTarjeta"
                value={formData.tipoTarjeta}
                onChange={handleInputChange}
                className="border-2 p-2 px-4 mb-2 block w-full border-primary-500 rounded-[10px]"
            >
                <option value="" disabled hidden>
                    Seleccione una tarjeta
                </option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
            </select>

            <p className="text-black pb-1">Número de tarjeta</p>
            <TextField
                placeholder="0000 0000 0000 0000"
                name="numero"
                value={formData.numero}
                onChange={handleInputChange}
                maxLength={19}
                className="border p-2 mb-2 block w-full"
            />

            <p className="text-black pb-1">Vencimiento (MM/YY)</p>
            <TextField
                placeholder="MM / YY"
                name="vencimiento"
                value={formData.vencimiento}
                onChange={handleInputChange}
                maxLength={5}
                className="border p-2 mb-2 block w-full"
            />

            <p className="text-black pb-1">CVC</p>
            <TextField
                placeholder="000"
                name="cvc"
                value={formData.cvc}
                onChange={(e) => {
                    const soloDigitos = e.target.value.replace(/\D/g, "").slice(0, 3);
                    setFormData((prev) => ({ ...prev, cvc: soloDigitos }));
                }}
                maxLength={3}
                type="password"
                className="border p-2 mb-2 block w-full"
            />

            <div className="flex gap-3 mt-4 justify-center">
                <Button
                    text={editandoId ? "Guardar Cambios" : "Guardar"}
                    onClick={handleSubmit}
                    variante="light"
                />
                <Button text="Cancelar" onClick={onCancel} />
            </div>
        </div>
    );
}