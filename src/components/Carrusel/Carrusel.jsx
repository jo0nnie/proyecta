import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Carrusel.css"
import { GiCookingPot } from "react-icons/gi";
import { Link } from "react-router";

//este array lo puse de ejemplo, cuando definamos las categorias vamos a cambiar por sus iconos correspondientes

const categories = [
    { icon: GiCookingPot, label: "Cocina", path: "/", color: "#2C4692" },
    { icon: GiCookingPot, label: "Cocina", path: "/", color: "#2C4692" },
    { icon: GiCookingPot, label: "Cocina", path: "/", color: "#2C4692" },
    { icon: GiCookingPot, label: "Cocina", path: "/", color: "#2C4692" },
    { icon: GiCookingPot, label: "Cocina", path: "/", color: "#2C4692" },
    { icon: GiCookingPot, label: "Cocina", path: "/", color: "#2C4692" },
    { icon: GiCookingPot, label: "Cocina", path: "/", color: "#2C4692" }
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