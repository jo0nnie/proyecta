import { MdRocketLaunch } from "react-icons/md";

export const BoostBadge = () => {
  return (
    <div
      className="absolute top-2 left-2 px-3 py-1 rounded-full text-white text-xs font-semibold shadow-md bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 flex items-center gap-1"
      title="Boost activo"
    >
      <MdRocketLaunch className="text-white text-base" />
      Boosted
    </div>
  );
};