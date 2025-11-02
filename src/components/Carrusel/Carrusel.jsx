import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import {
  FaDesktop,
  FaGift,
  FaHome,
  FaPaintBrush,
  FaTshirt,
  FaUtensils,
} from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { useEffect, useState } from "react";
import { api } from "../../api/api";

export default function Carrusel() {
  const [categorias, setCategorias] = useState([]);
  const categoriaIcon = {
    Tecnología: FaDesktop,
    Arte: FaPaintBrush,
    Moda: FaTshirt,
    Gastronomía: FaUtensils,
    Hogar: FaHome,
    "Salud y Bienestar": MdFavorite,
    Regalos: FaGift,
  };

  useEffect(() => {
    api.get("/categorias").then((res) => {
      const data = res.data.categorias.map((cat) => ({
        icon: categoriaIcon[cat.nombre] || FaGift,
        label: cat.nombre,
        path: `/categorias#${cat.nombre?.toLowerCase().replace(/\s+/g, "-")}`,
        color: "#2C4692",
      }));
      setCategorias(data);
    });
  }, []);

  return (
    <div className="w-full mx-auto relative px-6">
      <Swiper
        className="h-[120px] relative overflow-hidden"
        slidesPerView={5}
        navigation={true}
        modules={[Navigation]}
      >
        {categorias.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <SwiperSlide key={index}>
              <Link
                to={cat.path}
                className="flex flex-col items-center justify-center hover:scale-105 transition-transform duration-200"
              >
                <Icon size={50} color={cat.color} />
                <span className="text-center mt-2 whitespace-pre-line text-black font-semibold">
                  {cat.label}
                </span>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
