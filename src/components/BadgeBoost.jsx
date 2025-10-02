const BadgeBoost = ({ isBoosted }) => {
  if (!isBoosted) return null;

  return (
    <span className="bg-white text-[#2B4590] border border-[#2B4590] text-xs px-3 py-1 rounded-full shadow">
      Boosteado
    </span>
  );
};

export default BadgeBoost;
