import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-[#2B449E] text-white py-4 px-6">
            <div className="container mx-auto flex justify-between items-center">
                {/* logo app */}
                <Link to="/">
                    <img src="/Logo Cohete White.svg" alt="Logo Nave" className="w-11 h-11 cursor-pointer" />
                </Link>
                <div className="text-center text-sm leading-tight">
                    <p>Proyecta 2025</p>
                    <p>Cuadruple G - Practicas</p>
                    <p>Profesionalizantes 2</p>
                </div>
                {/* redes */}
                <div className="flex gap-4 text-xl">
                    <a href="https://instagram.com/proyecta">
                        <FaInstagram className="w-6 h-6"/>
                    </a>
                    <a href="https://facebook.com">
                        <FaFacebookF className="w-6 h-6"/>
                    </a>
                    <a href="https://x.com">
                        <FaXTwitter className="w-6 h-6"/>
                    </a>
                </div>
            </div>
        </footer>
        //s
    );
};




export default Footer;
