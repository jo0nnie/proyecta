import React from 'react'
import { PiUserCircleFill } from "react-icons/pi";
import Button from './Button';

const PerfilUsuario = ({ foto, nombre, descripcion, correo, ciudad, dateRegister, lastLog }) => {
    return (
        <div className="border border-gray-300 p-4 m-auto my-4 rounded-lg max-w-200">

            <div className='flex my-5 item-start gap-10 justify-between'>
                {foto ?
                (<img src={foto} alt={nombre}  className="w-24 h-24 rounded-full object-cover" />) 
                :
                (<PiUserCircleFill className="w-24 h-24 rounded-full p-2"/>)
                }
                <nav className='flex-1 mt-1'>
                    <h2>{nombre}</h2>
                    <p>{descripcion}</p>
                    <p>{correo}</p>
                </nav>
                <nav className='self-start'>
                <Button text={"Editar Perfil"}/>
                </nav>
            </div>

            <div className='flex flex-col my-5 border-y border-[#2B4590] p-4 space-y-4'>

                <div className='flex flex-col'>
                    <p className='font-semibold text-[#2B4590] mb-2'>Ciudad: </p>
                    <p className='text-[#666666]'>{ciudad || ''}</p>
                </div> 

                <div className='flex gap-52'>
                    <nav className='flex flex-col'>
                        <p className='font-semibold text-[#2B4590] mb-2'>Registrado el:</p>
                        <p className='text-[#666666]'>{dateRegister}</p>
                    </nav>
                    <nav className='flex flex-col'>
                        <p className='font-semibold text-[#2B4590] mb-2'>Último acceso:</p>
                        <p className='text-[#666666]'>{lastLog}</p>
                    </nav>
                </div>

            </div>

            <nav className='flex justify-end'>
            <Button text={"Cambiar Contraseña"}/>
            </nav>

        </div>
  )
}

export default PerfilUsuario
