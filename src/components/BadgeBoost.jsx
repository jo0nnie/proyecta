const BadgeBoost = ({ isBoosted }) => {
  if (!isBoosted) return null;

  return (
    <span className="bg-white text-primary-500 border border-primary-500 text-xs px-3 py-1 rounded-full shadow">
      Boosteado
    </span>
  );
};

export default BadgeBoost;
