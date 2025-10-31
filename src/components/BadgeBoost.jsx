const BadgeBoost = ({ isBoosted }) => {
  // TODO esto no se hace dentro de un componente, como mucho al condicional va antes de usuario
  // TODO si cuando un emprendimiento no esta boosteado no se visializa esto deberian hacerlo antes de renderizar este componente
  if (!isBoosted) return null;

  return (
    <span className="bg-white text-primary-500 border border-primary-500 text-xs px-3 py-1 rounded-full shadow">
      Boosteado
    </span>
  );
};

export default BadgeBoost;
