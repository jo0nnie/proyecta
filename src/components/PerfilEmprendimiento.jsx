import React, { useState } from 'react';
import { PiUserCircleFill } from "react-icons/pi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const PerfilEmprendimiento = ({ emprendimiento }) => {
    // desestructuro los datos del emprendimiento que llegan por props para usarlos (datos ficticios como fotos, correo y descripcion)
    const { nombre, categoria, imagen, resumen, correo, fotos, descripcion } = emprendimiento;

    const [guardado, setGuardado] = useState(false);

    // esto se deberá conectar a la funcionalidad real de favoritos después
    const toggleGuardado = () => {
        setGuardado(!guardado);
    };

    return (
        <div className="p-8 mx-auto mt-8 rounded-lg max-w-4xl bg-white shadow">

            {/* Contenedor principal con la imagen, nombre y datos básicos */}
            <div className='flex justify-between items-start gap-8'>
                <div className="flex gap-6 items-start">
                    {imagen ?
                        <img src={imagen} alt={nombre} className="w-24 h-24 rounded-full object-cover" />
                        :
                        <PiUserCircleFill className="w-24 h-24 rounded-full p-2" />
                    }
                    <div>
                        <h1 className="text-2xl font-semibold flex items-center gap-2">
                            {nombre}
                            <span className="text-sm text-gray-500 font-normal">({categoria})</span>
                        </h1>
                        <p className="text-gray-600">{resumen}</p>
                        <p className="text-blue-700">{correo}</p>
                    </div>
                </div>

                {/* botón para guardar o quitar de favoritos */}
                <div className='text-right'>
                    <button onClick={toggleGuardado}>
                        {guardado
                            ? <BsBookmarkFill className="text-2xl text-blue-700 cursor-pointer" />
                            : <BsBookmark className="text-2xl text-blue-700 cursor-pointer" />
                        }
                    </button>
                </div>
            </div>

            {/* sección con fotos extra del emprendimiento */}
            <div className="mt-6 border-t border-[#2B4590] pt-4">
                <h2 className="text-[#2B4590] font-bold mb-4">Descripción</h2>

                <div className="flex gap-4 mb-4 flex-wrap">
                    {/* mapeo el array de fotos, si existe, para mostrarlas */}
                    {Array.isArray(fotos) && fotos.map((foto, i) => (
                        <img key={i} src={foto} alt={`foto-${i}`} className="w-32 h-24 object-cover rounded-lg" />
                    ))}
                </div>
            </div>

            <div className="mt-6 border-t border-[#2B4590] pt-4">
                <p className="text-gray-700 whitespace-pre-line">{descripcion}</p>
            </div>
        </div>
    );
};

export default PerfilEmprendimiento;
