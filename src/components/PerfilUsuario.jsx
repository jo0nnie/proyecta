import React from 'react';
import { PiUserCircleFill } from "react-icons/pi";
import Button from './Button';
import { Link } from 'react-router-dom';
import CardEmprendimiento from './CardEmprendimiento';
import BadgeBoost from './BadgeBoost';
import perfilemprendiemientoMock from "../utils/perfilemprendiemientoMock.json";

const PerfilUsuario = ({ usuario }) => {
    const { id, foto, nombre, descripcion, correo, ciudad, dateRegister, lastLog } = usuario;

    const emprendimientosDelUsuario = perfilemprendiemientoMock.filter(
        (emprendimiento) => Number(emprendimiento.usuarioId) === Number(id)
    );

    return (
        <div className="border border-gray-300 p-4 m-auto my-4 rounded-lg max-w-200">

            <div className='flex my-5 item-start gap-10 justify-between'>
                {foto ?
                    (<img src={foto} alt={nombre} className="w-24 h-24 rounded-full object-cover" />)
                    :
                    (<PiUserCircleFill className="w-24 h-24 rounded-full p-2" />)
                }
                <nav className='flex-1 mt-1'>
                    <h2>{nombre}</h2>
                    <p>{descripcion}</p>
                    <p>{correo}</p>
                </nav>
                <nav className='self-start'>
                    <Button text={"Editar Perfil"} />
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

            <div className='flex flex-col'>
                <p className='font-semibold text-[#2B4590] mb-2 ml-5'>Mis emprendimientos: </p>

                {emprendimientosDelUsuario.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 px-5'>
                        {emprendimientosDelUsuario.map((emprendimiento) => (
                            <div key={emprendimiento.id} className="relative">
                                <CardEmprendimiento {...emprendimiento} descripcion={emprendimiento.resumen} />
                                {emprendimiento.id === "993" && (
                                    <div className="absolute bottom-2 right-4 md:right-4 sm:left-1/2 sm:transform sm:-translate-x-1/2">
                                        <Link to={`/carrito/${emprendimiento.id}`}>
                                            <Button text="Boostear" />
                                        </Link>
                                    </div>
                                )}
                                {emprendimiento.id === "994" && (
                                    <div className="absolute bottom-2 right-4 md:right-4 sm:left-1/2 sm:transform sm:-translate-x-1/2">
                                        <Link to={`/carrito/${emprendimiento.id}`}>
                                            <Button text="Boostear" />
                                        </Link>
                                    </div>
                                )}
                                {emprendimiento.id === "995" && (
                                    <div className="absolute bottom-2 right-4 md:right-4 sm:left-1/2 sm:transform sm:-translate-x-1/2">
                                        <Link to={`/carrito/${emprendimiento.id}`}>
                                            <Button text="Boostear" />
                                        </Link>
                                    </div>
                                )}
                                {emprendimiento.id === "996" && (
                                    <div className="absolute bottom-2 right-4 md:right-4 sm:left-1/2 sm:transform sm:-translate-x-1/2">
                                        <Link to={`/carrito/${emprendimiento.id}`}>
                                            <Button text="Boostear" />
                                        </Link>
                                    </div>
                                )}
                                {emprendimiento.id === "997" && (
                                    <div className="absolute bottom-2 right-4 md:right-4 sm:left-1/2 sm:transform sm:-translate-x-1/2">
                                        <Link to={`/carrito/${emprendimiento.id}`}>
                                            <Button text="Boostear" />
                                        </Link>
                                    </div>
                                )}
                                {emprendimiento.id === "998" && (
                                    <div className="absolute top-4 left-4">
                                        <BadgeBoost isBoosted={true} />
                                    </div>
                                )}

                                {emprendimiento.id === "999" && (
                                    <div className="absolute bottom-2 right-4 md:right-4 sm:left-1/2 sm:transform sm:-translate-x-1/2">
                                        <Link to={`/carrito/${emprendimiento.id}`}>
                                            <Button text="Boostear" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='text-gray-500 ml-5'>Todavía no tenés emprendimientos creados.</p>
                )}

                <Link to="/perfil/miemprendimiento" className='mt-4 self-start ml-5'>
                    <Button text={"Crear Emprendimiento"} />
                </Link>
            </div>
        </div>
    );
};

export default PerfilUsuario;