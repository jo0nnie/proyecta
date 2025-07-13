import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Carrusel.css"
import { Link } from "react-router";
import { FaHamburger } from "react-icons/fa";
import { AiFillBook, AiOutlineConsoleSql, AiFillCar, AiFillCustomerService, AiFillCamera, AiFillSkin } from "react-icons/ai";




//este array lo puse de ejemplo, cuando definamos las categorias vamos a cambiar por sus iconos correspondientes

const categories = [
    { icon: AiOutlineConsoleSql, label: "Desarrollo", path: "/", color: "#2C4692" },
    { icon: AiFillCamera, label: "Fotografía", path: "/", color: "#2C4692" },
    { icon: AiFillCar, label: "Transporte", path: "/", color: "#2C4692" },
    { icon: AiFillBook, label: "Librerías", path: "/", color: "#2C4692" },
    { icon: AiFillCustomerService, label: "Música", path: "/", color: "#2C4692" },
    { icon: AiFillSkin, label: "Moda", path: "/", color: "#2C4692" },
    { icon: FaHamburger , label: "Comida", path: "/", color: "#2C4692" }
];

export default function Carrusel() {
  return (
    <div className="w-full mx-auto relative px-6">
      <Swiper
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
                className="flex flex-col items-center justify-center hover:scale-102 transition-transform"
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