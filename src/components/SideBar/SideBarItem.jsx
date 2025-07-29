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
