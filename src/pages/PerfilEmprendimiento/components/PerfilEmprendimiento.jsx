import { useState, useEffect } from 'react';
import { Badge } from '../../../components/Badge';
import { PiUserCircleFill } from "react-icons/pi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useSelector } from 'react-redux';
const PerfilEmprendimiento = ({ emprendimiento }) => {
    const token = useSelector((state) => state.auth.token);
    const { nombre, categoria, imagen, resumen, correo, descripcion } = emprendimiento;
    const [guardado, setGuardado] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setGuardado(favorites.includes(emprendimiento.id));
    }, [emprendimiento.id]);

    const toggleGuardado = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (guardado) {
            favorites = favorites.filter(favId => favId !== emprendimiento.id);
        } else {
            favorites.push(emprendimiento.id);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setGuardado(!guardado);
    };

    return (
        <div className="p-8 mx-auto mt-8 rounded-lg max-w-4xl bg-white shadow">

            {/* Encabezado con imagen circular, nombre y categoría */}
            <div className='flex justify-between items-start gap-8'>
                <div className="flex gap-6 items-start">
                    {imagen
                        ? <img src={imagen} alt={nombre} className="w-24 h-24 rounded-full object-cover" />
                        : <PiUserCircleFill className="w-24 h-24 rounded-full p-2" />
                    }
                    <div>
                        <h1 className="text-4xl font-semibold flex items-center gap-2">
                            {nombre}
                        </h1>
                        <div className="mt-2">
                            <Badge text={categoria} />
                        </div>
                        {/* <p className="text-gray-600">{resumen}</p> */}
                    </div>
                </div>

                {/* Botón de favoritos */}
                {token && (
                    <div className='text-right'>
                        <button
                            onClick={toggleGuardado}
                            className="bg-white p-2 rounded-full shadow-md text-xl text-gray-600 hover:text-blue-600"
                            aria-label={guardado ? "Quitar de favoritos" : "Añadir a favoritos"}
                        >
                            {guardado ? <FaBookmark /> : <FaRegBookmark />}
                        </button>
                    </div>
                )}
            </div>

            {/* Sección de descripción */}
            <div className="mt-6 border-t border-[#2B4590] pt-4">
                <h2 className="text-[#2B4590] font-bold mb-4">Descripción</h2>
                <p className="text-gray-700 whitespace-pre-line mb-6">{descripcion}</p>

                {/* Imagen debajo de la descripción */}
                {imagen && (
                    <img
                        src={imagen}
                        alt={`imagen-${nombre}`}
                        className="w-80 max-w-md mx-auto"
                    />
                )}
            </div>
        </div>
    );
};

export default PerfilEmprendimiento;