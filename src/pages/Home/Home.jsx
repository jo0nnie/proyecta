import { Navbar, Button } from "../../components";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-[82vh]">
<section className="px-8 md:px-20 py-12 bg-white">
        <div className="bg-[#2C4692] text-white py-3 mb-10 text-center text-xl">
          Sobre Nosotros
          </div>
          
          <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C4692] mb-4 pb-4">
              Impulsamos <br /> emprendimientos <br /> locales
            </h2>
            <p className="text-gray-700 mb-6">
              Creemos en el talento de Misiones. Por eso creamos Proyecta, 
              una plataforma que te ayuda a mostrar tu trabajo y llegar más lejos.
            </p>

            <h3 className="text-2xl md:text-2xl font-bold text-[#2C4692] mb-2">
              Nuestra misión
            </h3>
            <p className="text-gray-700">
              Establecida en 2025, la misión central de Proyecta es transformar el panorama emprendedor de Posadas, Misiones, 
              creando una plataforma dinámica que empodere a cada emprendedor. Buscamos ser el espacio donde cada visión se 
              materialice, cada producto encuentre su audiencia y cada servicio genere impacto, asegurando que el esfuerzo y 
              la creatividad de nuestra gente lleguen a un público amplio y diverso.
            </p>
          </div>

          <div className="flex-1">
            <img
              src="/Logo Sobre Nosotros.svg"
              alt="Logo SobreNosotros"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl md:text-2xl font-bold text-[#2C4692] mb-2">El equipo</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-items-center">
            <div className="flex flex-col items-center">
              <img
                src="/Logo Equipo Laura.svg"
                alt="Logo Laura"
                className="w-37 h-37"
              />
              <p className="mt-2 text-center text-[#2C4692] font-medium">
                Gauto Laura
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/Logo Equipo Lucrecia.svg"
                alt="Logo Lucrecia"
                className="w-37 h-37"
              />
              <p className="mt-2 text-center text-[#2C4692] font-medium">
                Galarza Lucrecia
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
              src="/Logo Equipo Guillermo.svg"
                alt="Logo Guillermo"
                className="w-37 h-37"
              />
              <p className="mt-2 text-center text-[#2C4692] font-medium">
                Viera Guillermo
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/Logo Equipo Francisco.svg"
                alt="Logo Francisco"
                className="w-37 h-37"
              />
              <p className="mt-2 text-center text-[#2C4692] font-medium">
                Galarza Francisco
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-12 md:px-20 px-8 pt-20">
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img
              src="/Logo PROYECTA Blue.svg"
              alt="Logo PROYECTA"
              className="max-w-[280px] w-full h-auto"
            />
          </div>
          
          <div className="w-full md:w-1/2 md:pl-6">
            <p className="mb-6 text-gray-800 leading-relaxed">
              Si nuestra visión de impulsar el talento local y nuestro compromiso con el desarrollo de Misiones coinciden con tus valores,
              y considerás que tu emprendimiento merece un espacio para crecer y alcanzar a más personas…
            </p>
            <h3 className="text-xl font-semibold text-center text-[#2C4692] mb-6">
              ¡Es el momento de dar el paso!
            </h3>
              <Link to="/auth/register">
                <Button type="button" text="Registrate ahora" />
              </Link>
          </div>
        </div>
      </section>
      </div>
      
      <Footer />
    </>
  );
}
