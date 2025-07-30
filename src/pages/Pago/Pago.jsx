import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer/Footer';
import PlanCard from '../../components/PlanCard';
import planes from '../../utils/planesMock';

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
                    <div className="flex flex-col m-10 gap-5">
                            {planes.map((plan, index) => (
                                <PlanCard key={index} plan={plan}/>
                            ))}
                    </div>
                    <div className="flex flex-col">
                        
                    </div>
                    <div className="flex flex-col border-l border-[#2B4590] w-full">
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}