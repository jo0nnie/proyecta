import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer/Footer';
import PlanCard from '../../components/PlanCard';
import planes from '../../utils/planesMock';
import CardEmprendimiento from '../../components/CardEmprendimiento';
import Button from '../../components/Button';

export default function Pago(){

    return (
        <>
            <NavBar/>
            <div className=''>
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
                                <h1 className='flex justify-center font-bold l-full'> Resumen del Pedido</h1>
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
                    <div className="flex flex-col border-l border-[#2B4590] w-full">
                        <Button text={"Confirmar y Pagar"}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}