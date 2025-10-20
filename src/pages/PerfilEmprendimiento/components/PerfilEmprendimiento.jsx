import { useState } from 'react';
import { Badge } from '../../../components/Badge';
import { PiUserCircleFill } from "react-icons/pi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const PerfilEmprendimiento = ({ emprendimiento }) => {
    const { nombre, categoria, imagen, resumen, correo, descripcion } = emprendimiento;
    const [guardado, setGuardado] = useState(false);

    const toggleGuardado = () => {
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
                            <Badge text={categoria} />
                        </h1>
                        <p className="text-gray-600">{resumen}</p>
                        <p className="text-black-700">Usuario: {nombre}</p>
                    </div>
                </div>

                {/* Botón de favoritos */}
                <div className='text-right'>
                    <button onClick={toggleGuardado}>
                        {guardado
                            ? <BsBookmarkFill className="text-2xl text-blue-700 cursor-pointer" />
                            : <BsBookmark className="text-2xl text-blue-700 cursor-pointer" />
                        }
                    </button>
                </div>
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