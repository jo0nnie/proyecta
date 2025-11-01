import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { api } from "../../../api/api";
import { toast } from "react-toastify";

const CrearEmprendimientoForm = () => {
  const navigate = useNavigate();
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
    const token = localStorage.getItem("token");
    console.log(token)
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
      const mensaje = error.response?.data?.error || "Hubo un problema al enviar el formulario.";
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="nombre"
          className="block font-medium mb-1 text-[#2B4590]"
        >
          Nombre del emprendimiento *
        </label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label
          htmlFor="descripcion"
          className="block font-medium mb-1 text-[#2B4590]"
        >
          Descripción *
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label
          htmlFor="categoriaId"
          className="block font-medium mb-1 text-[#2B4590]"
        >
          Categoría *
        </label>
        <select
          id="categoriaId"
          name="categoriaId"
          value={formData.categoriaId}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Seleccionar categoría</option>
          <option value="1">Tecnología</option>
          <option value="2">Arte</option>
          <option value="3">Moda</option>
          <option value="4">Gastronomía</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1 text-[#2B4590]">
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
            className="flex-grow p-2 border border-gray-300 rounded bg-gray-100 text-sm text-gray-700"
          />
          <button
            type="button"
            onClick={handleFileClick}
            className="px-4 py-2 bg-[#2B4590] text-white rounded hover:bg-[#1f3266]"
          >
            Seleccionar archivo
          </button>
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

      <button
        type="submit"
        disabled={!isFormValid() || enviando}
        className="w-full py-2 bg-[#2B4590] text-white rounded hover:bg-[#1f3266] disabled:opacity-50"
      >
        {enviando ? "Enviando" : "Crear"}
      </button>
    </form>
  );
};

export default CrearEmprendimientoForm;
