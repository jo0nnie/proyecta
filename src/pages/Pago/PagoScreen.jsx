import { useState } from 'react';
import { PlanCard, CardEmprendimiento, Button, TextField, MetodoPagoCard, CarritoResumen, SelectorEmprendimiento } from '../../components';
import planes from '../../utils/planesMock';
import perfilemprendimientoMock from '../../utils/perfilemprendiemientoMock';

export default function PagoScreen() {
    const emprendimientosDelPerfil = [
        { id: "999", nombre: "Tienda EcoPosadas" },
        { id: "997", nombre: "Panadería La Miga" },
        { id: "996", nombre: "Estudio Creativo Pixel" }
    ];

    const [emprendimientoActivoId, setEmprendimientoActivoId] = useState(emprendimientosDelPerfil[0].id);
    const [carrito, setCarrito] = useState([]);

    const emprendimientoActivo = perfilemprendimientoMock.find(
        (e) => String(e.id) === String(emprendimientoActivoId)
    );

    const agregarAlCarrito = (plan) => {
        const yaExiste = carrito.find(
            (p) => p.titulo === plan.titulo && p.emprendimientoId === emprendimientoActivo.id
        );
        if (!yaExiste) { setCarrito([...carrito, { ...plan, emprendimientoId: emprendimientoActivo.id, nombreEmprendimiento: emprendimientoActivo.nombre }]); }
    };

    const vaciarCarrito = () => setCarrito([]);

    return (
        <div>
            <nav className='p-5 border-b border-[#2B4590]'>
                <h1 className='flex justify-center text-xl font-bold'>Boosteo de Emprendimientos</h1>
                <h1 className='flex justify-center'>¡Haz que tu emprendimiento llegue a más personas!</h1>
            </nav>

            <div className="flex overflow-x-auto gap-4 p-6 border-b border-[#2B4590] bg-[#F9FAFB]">
                {planes.map((plan, index) => (
                    <div key={index} className="flex-shrink-0">
                        <PlanCard
                            plan={plan}
                            onObtener={() => agregarAlCarrito(plan)}
                            isSeleccionado={carrito.some(
                                (p) => p.titulo === plan.titulo && p.emprendimientoId === emprendimientoActivo?.id
                            )}
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center gap-4 p-4">
                <SelectorEmprendimiento
                    emprendimientos={emprendimientosDelPerfil}
                    selectedId={emprendimientoActivoId}
                    onChange={setEmprendimientoActivoId}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-10">
                <div className="flex justify-center items-start">
                    <CarritoResumen carrito={carrito} onVaciar={vaciarCarrito} />
                </div>

                <div className="flex justify-center items-start">
                    {emprendimientoActivo ? (
                        <div className="flex flex-col items-center gap-4">
                            <CardEmprendimiento {...emprendimientoActivo} />
                        </div>
                    ) : (
                        <p className='text-red-500'>Emprendimiento no encontrado</p>
                    )}
                </div>

                <div className={`flex flex-col items-center gap-10 border-l border-[#2B4590] pl-10 ${carrito.length === 0 ? 'opacity-30 pointer-events-none' : ''}`}>
                    <nav className='border rounded-xl border-[#2B4590] w-full'>
                        <p className='border-b border-[#2B4590] p-5'>
                            <h1 className='flex justify-center font-bold'>Escoge tu Medio de Pago</h1>
                        </p>
                        <ul className='flex flex-col m-5 items-center'>
                            <MetodoPagoCard />
                        </ul>
                    </nav>

                    <nav className='border rounded-xl border-[#2B4590] w-full'>
                        <p className='border-b border-[#2B4590] p-5'>
                            <h1 className='flex justify-center font-bold'>Detalles de Pago</h1>
                        </p>
                        <ul className='m-5'>
                            <p>Titular de Tarjeta</p>
                            <TextField placeholder={"Nombre en el frente de la tarjeta"} />
                            <p>Numero de Tarjeta</p>
                            <TextField placeholder={"0000 0000 0000 0000"} />
                            <p>Fecha de Expiración</p>
                            <nav className='flex gap-10'>
                                <select className="w-1/2 border rounded p-2 text-sm text-gray-600">
                                    <option value="">Mes</option>
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                                    ))}
                                </select>
                                <select className="w-1/2 border rounded p-2 text-sm text-gray-600">
                                    <option value="">Año</option>
                                    {[...Array(10)].map((_, i) => {
                                        const year = new Date().getFullYear() + i;
                                        return <option key={i} value={year}>{year}</option>;
                                    })}
                                </select>
                            </nav>
                            <p>Codigo de Seguridad</p>
                            <TextField placeholder={"CVC"} />
                        </ul>
                    </nav>

                    <Button text={"Confirmar y Pagar"} />
                </div>
            </div>
        </div>
    );
}
