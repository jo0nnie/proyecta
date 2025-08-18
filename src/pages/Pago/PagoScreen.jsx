import PlanCard from '../../components/PlanCard';
import planes from '../../utils/planesMock';
import CardEmprendimiento from '../../components/CardEmprendimiento';
import Button from '../../components/Button';
import MetodoPagoCard from '../../components/MetodoPagoCard';
import TextField from '../../components/TextField';

export default function PagoScreen(){

    return (
            <div>
                <nav className='p-5 border-b border-[#2B4590]'>
                    <h1 className='flex justify-center text-xl font-bold'>Boosteo de Emprendimientos</h1>   
                    <h1 className='flex justify-center'>¡Haz que tu emprendiemiento llegue a mas personas!</h1>  
                </nav>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="flex flex-col p-10 gap-5">
                            {planes.map((plan, index) => (
                                <PlanCard key={index} plan={plan}/>
                            ))}
                    </div>
                    <div className="flex flex-col items-center gap-10 p-10">
                        <nav>
                            <CardEmprendimiento/>
                            <p className='text-[#2B4590] underline m-2 cursor-pointer'>Cambiar emprendimiento</p>
                        </nav>
                        <nav className='border rounded-xl border-[#2B4590] w-70'>
                            <p className='border-b border-[#2B4590] p-5'>
                                <h1 className='flex justify-center font-bold'> Resumen del Pedido</h1>
                            </p>
                            <ul className='m-3'>
                                <p className='font-bold'>Emprendimiento:</p>
                                <p className='text-[#2B4590]'>Texto</p>
                            </ul>
                            <ul className='m-3'>
                                <p className='font-bold'>Boosteo:</p>
                                <p className='text-[#2B4590]'>Texto</p>
                            </ul>
                            <ul className='flex justify-between m-3'>
                                <p className='font-bold'>Total</p>
                                <p className='text-[#2B4590] font-bold'>Precio</p>
                            </ul>
                        </nav>
                    </div>
                    <div className="flex flex-col items-center gap-10 p-10 border-l border-[#2B4590]">
                        <nav className='border rounded-xl border-[#2B4590] w-full'>
                            <p className='border-b border-[#2B4590] p-5'>
                                <h1 className='flex justify-center font-bold'>Escoge tu Medio de Pago</h1>
                            </p>
                            <ul className='flex flex-col m-5 items-center'>
                                <MetodoPagoCard/>
                            </ul>
                        </nav>
                        <nav className='border rounded-xl border-[#2B4590] w-full'>
                            <p className='border-b border-[#2B4590] p-5'>
                                <h1 className='flex justify-center font-bold'>Detalles de Pago</h1>
                            </p>
                            <ul className='m-5'>
                                <p>Titular de Tarjeta</p>
                                <TextField placeholder={"Nombre en el frente de la tarjeta"}/>
                                <p>Numero de Tarjeta</p>
                                <TextField placeholder={"0000 0000 0000 0000"}/>
                                <p>Fecha de Expiracion</p>
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
                                <TextField placeholder={"CVC"}/>
                            </ul>
                        </nav>
                        <Button text={"Confirmar y Pagar"}/>
                    </div>
                </div>
            </div>
    
    )
}