import { useState } from "react";
import { Link } from "react-router-dom";

export const SideBarItem = ({ text, path }) => {
  return (
    <Link
      to={path}
      className="flex items-center gap-3 px-4 py-2 rounded hover:bg-[#3c56a5] transition-colors"
    >
      {/* Ícono acá */}
      <span>{text}</span>
    </Link>
  );
};


export const SideBarDropItem = ({text, items}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
      onClick={()=>setIsOpen(!isOpen)} 
      className="w-full text-left flex items-center gap-3 px-4 py-2 rounded hover:bg-[#3c56a5] cursor-pointer transition-colors"
      >
        <span>{text}</span>
        <span className="ml-auto transform transition-transform duration-200">
          {isOpen ? "▼" : "▲"}
        </span>
      </button>
      
      <div className={`absolute bottom-full left-0 w-full transition-all duration-300 ease-in-out${isOpen ? "max-h-40 opacity-100 mb-2" : "max-h-0 opacity-0"}`}>
        <ul className="p-4 space-y-2 rounded text-[#000] bg-[#fff] flex-1">
          {items.map((item, index) => (
            <li key={index}>
              <Link
              to={item.path}
              className="flex items-center gap-3 p-2 rounded  hover:bg-[#3c56a5] transition-colors"
              >
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}
