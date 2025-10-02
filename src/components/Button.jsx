export default function Button({ type, text, onClick, variante = "dark" }) {
  const VariantedeColor =
    variante === "dark" ? "bg-primary-500" : "bg-primary-400";

  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`py-2 px-6 ${VariantedeColor} text-dark-logo text-size-base font-medium rounded-[12px] shadow-md transition-all duration-200 mx-auto block font-family-inter cursor-pointer`}
      >
        {text}
      </button>
    </div>
  );
}
