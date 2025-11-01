import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-primary-500 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo app */}
        <Link to="/">
          {/* TODO los nombres de los archivos como este svg
                    TODO deben escribirse con kevab case o snake case 
                    TODO no se usan espacios...
                    TODO logo-proyecta-ligth.svg --- cambiar "ligth" por "white" si lo prefieren
                    TODO logo_proyecta_ligth.svg --- cambiar "ligth" por "white" si lo prefieren
                 */}
          <img
            src="/Logo_Cohete_White.svg"
            alt="Logo Nave"
            className="w-11 h-11 cursor-pointer"
          />
        </Link>
        <div className="text-center text-sm leading-tight">
          <p>Proyecta 2025</p>
          <p>Cuadruple G - Practicas</p>
          <p>Profesionalizantes 2</p>
        </div>
        {/* redes */}
        <div className="flex gap-4 text-xl">
          <a href="https://instagram.com/proyecta">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="https://facebook.com">
            <FaFacebookF className="w-6 h-6" />
          </a>
          <a href="https://x.com">
            <FaXTwitter className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
