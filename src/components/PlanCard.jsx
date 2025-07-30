import React from 'react';

export default function PlanCard ({plan}) {
    const {titulo, beneficio, duracion, precio} = plan;
    return (
        <div className='border-3 rounded-xl border-[#2B4590] p-2 shadow-md hover:shadow-xl'>
            <h2 className='text-xl font-bold m-2'>{titulo}</h2>
            <ul className='list-disc list-inside m-2'>
                {beneficio.map((dato, index) => (
                <li key={index}>{dato}</li> 
                ))}
            </ul>
            <nav className='flex justify-between'>
            <p className='text-[#2B4590] underline m-2 '>{duracion}</p>
            <p className='text-xl text-[#2B4590] font-bold m-2 '>${precio}</p>
            </nav>
        </div>
    )
}
