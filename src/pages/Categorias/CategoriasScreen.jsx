import { CardEmprendimiento } from "../../components";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import emprendimientos from "../../utils/emprendimientoMock.json";

export default function CategoriasScreen() {
    const [emprendimientosPorCategoria, setEmprendimientosPorCategoria] = useState({});

    useEffect(() => {
        const agrupados = emprendimientos.reduce((acc, item) => {
            if (!acc[item.categoria]) acc[item.categoria] = [];
            acc[item.categoria].push(item);
            return acc;
        }, {});
        setEmprendimientosPorCategoria(agrupados);
    }, []);
    // revisar el gap-x de las cards
    return (
            <main className="min-h-screen bg-gray-100 px-6 py-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#2C4692] m-1 p-2 text-center">
                    Categorías
                </h1>

                {Object.entries(emprendimientosPorCategoria).map(([categoria, items]) => (
                    <div key={categoria} className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6 text-[#2C4692]">{categoria}</h2>

                        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-60 justify-items-center ">
                            {items.map((item) => (
                                <CardEmprendimiento
                                    key={item.id}
                                    id={item.id}
                                    nombre={item.nombre}
                                    descripcion={item.descripcion}
                                    categoria={item.categoria}
                                    imagen={item.imagen}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </main>
    );
}
