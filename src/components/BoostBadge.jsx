import { MdRocketLaunch } from "react-icons/md";

export const BoostBadge = () => {
  return (
    <span
      className="px-3 py-1 rounded-full text-white text-xs font-semibold shadow-md bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 inline-flex items-center gap-1"
      title="Boost activo"
    >
      <MdRocketLaunch className="text-white text-base" />
      Boosted
    </span>
  );
};