export default function Button({
  type,
  text,
  onClick,
  variant = "dark",
  fullWidth = false,
  customStyle,
}) {
  const VariantedeColor =
    variant === "dark" ? "bg-primary-500 text-white" : "bg-white text-primary-500";

  const baseStyle = "py-2 px-6 text-size-base font-medium rounded-[12px] shadow-md transition-all duration-200 mx-auto block font-family-inter cursor-pointer";
  const widthClass = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      type={type}
      onClick={onClick}
      className={
        customStyle ??
        `${baseStyle} ${VariantedeColor} ${widthClass} ${customStyle}`
      }
    >
      {text}
    </button>
  );
}
