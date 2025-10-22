import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SideBarItem = ({ text, path, onClose }) => {
  const handleClick = () => {
    if (onClose) onClose();
  };

  return (
    <Link
      to={path}
      onClick={handleClick} 
      className="flex items-center gap-3 px-4 py-2 rounded hover:bg-[#3c56a5] transition-colors"
    >
      <span>{text}</span>
    </Link>
  );
};

export const SideBarDropItem = ({ text, items, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    if (onClose) onClose(); 
    navigate(path);         
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex items-center gap-3 px-4 py-2 rounded hover:bg-[#3c56a5] cursor-pointer transition-colors"
      >
        <span>{text}</span>
        <span className="ml-auto transform transition-transform duration-200">
          {isOpen ? "▼" : "▲"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 w-full transition-all duration-300 ease-in-out max-h-40 opacity-100 mb-2">
          <ul className="p-4 space-y-2 rounded text-[#000000] bg-[#A9B5EF] flex-1">
            {items.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleItemClick(item.path)}
                  className="flex items-center gap-3 p-2 rounded hover:bg-[#3c56a5] transition-colors w-full text-left"
                >
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};