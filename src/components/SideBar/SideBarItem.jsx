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
  const [isOpen, SetIsOpen] = useState(false);
  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded hover:bg-[#3c56a5] transition-colors">
      
      <button
      onClick={()=>SetIsOpen(!isOpen)}
      >
        <span>{text}</span>
      </button>
      
      <div className={isOpen ? "max-h-40 opacity-100 mb-2" : "max-h-0 opacity-0"}>
        <ul className="p-4 space-y-2 flex-1">
          {items.map((item, index) => (
            <li key={index}>
              <Link
              to={item.path}
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
