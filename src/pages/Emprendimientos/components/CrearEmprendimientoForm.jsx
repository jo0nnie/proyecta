import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { api } from "../../../api/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useCategorias } from "../../../hooks/useCategorias";
import { TextField, Button } from "../../../components";
const CrearEmprendimientoForm = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { categorias, loading } = useCategorias();
  const [enviando, setEnviando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoriaId: "",
    imagen: null,
  });
  const fileInputRef = useRef(null);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setFormData((prev) => ({ ...prev, imagen: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isFormValid = () => {
    return (
      formData.nombre.trim() &&
      formData.descripcion.trim() &&
      formData.categoriaId
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid() || enviando) {
      toast.warn("Por favor completá todos los campos obligatorios.");
      return;
    }
    setEnviando(true);

    const data = new FormData();

    data.append("nombre", formData.nombre.trim());
    data.append("descripcion", formData.descripcion.trim());
    data.append("categoriaId", Number(formData.categoriaId));
    if (formData.imagen) {
      data.append("imagen", formData.imagen);
    }

    try {
      const response = await api.post("/emprendimientos", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Respuesta del servidor:", response.data);
      toast.success("¡Emprendimiento creado con éxito!");
      setFormData({
        nombre: "",
        descripcion: "",
        categoriaId: "",
        imagen: null,
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      navigate("/emprendimientos");
    } catch (error) {
      console.error(
        "Error en el envío:",
        error.response?.data || error.message
      );
      const mensaje =error.response?.data?.msg ||error.response?.data?.error ||"Hubo un problema al enviar el formulario.";
      toast.error(mensaje);
    } finally {
      setEnviando(false);
    }

  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <TextField
        label="Nombre del emprendimiento *"
        type="text"
        name="nombre"
        placeholder="Nombre del emprendimiento"
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
          placeholder="Describe tu emprendimiento"
          className="border-2 border-primary-500 rounded-[10px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2C4692]"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="categoriaId"
          className="text-primary-500 text-size-base font-medium"
        >
          Categoría *
        </label>
        <select
          id="categoriaId"
          name="categoriaId"
          value={formData.categoriaId}
          onChange={handleChange}
          className="border-2 border-primary-500 rounded-[10px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2C4692]"
          required
        >
          <option value="">Seleccionar categoría</option>
          {loading ? (
            <option disabled>Cargando categorías...</option>
          ) : (
            categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-primary-500 text-size-base font-medium">
          Imagen del emprendimiento
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={
              formData.imagen
                ? formData.imagen.name
                : "Sin archivos seleccionados"
            }
            className="flex-grow border-2 border-primary-500 rounded-[10px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2C4692] bg-gray-100 text-sm text-gray-700"
          />
          <Button
            type="button"
            text="Seleccionar imagen"
            onClick={handleFileClick}
          />
          <input
            ref={fileInputRef}
            id="imagen"
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>
      </div>

      <Button
        type="submit"
        text={enviando ? "Enviando" : "Crear"}
        disabled={!isFormValid() || enviando}
      />
    </form>
  );
};

export default CrearEmprendimientoForm;
