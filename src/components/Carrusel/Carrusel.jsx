import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Carrusel.css";
import { Link } from "react-router";
import {
  FaDesktop,
  FaGift,
  FaHome,
  FaTshirt,
  FaUtensils,
} from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

// TODO esto ya no deberia estar mockeado... usar categorias existentes en la BD
const categories = [
  {
    icon: FaDesktop,
    label: "Tecnología",
    path: "/categorias#tecnologia",
    color: "#2C4692",
  },
  { icon: FaTshirt, label: "Moda", path: "/categorias#moda", color: "#2C4692" },
  { icon: FaHome, label: "Hogar", path: "/categorias#hogar", color: "#2C4692" },
  {
    icon: FaUtensils,
    label: "Gastronomía",
    path: "/categorias#gastronomia",
    color: "#2C4692",
  },
  {
    icon: MdFavorite,
    label: "Salud y Bienestar",
    path: "/categorias#salud-y-bienestar",
    color: "#2C4692",
  },
  {
    icon: FaGift,
    label: "Diseños y regalos",
    path: "/categorias#disenos-y-regalos",
    color: "#2C4692",
  },
];

export default function Carrusel() {
  return (
    <div className="w-full mx-auto relative px-6">
      <Swiper
        // TODO: Es necesario usar un css para este estilo? si no lo es borrarlo y usar tailwind
        className="carrusel-container"
        slidesPerView={5}
        navigation={true}
        modules={[Navigation]}
      >
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <SwiperSlide key={index}>
              <Link
                to={cat.path}
                className="flex flex-col items-center justify-center hover:scale-101 transition-transform"
              >
                <Icon size={50} color={cat.color} />
                <div>
                  <span className="text-center mt-2 whitespace-pre-line text-black font-semibold">
                    {cat.label}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
