//componente button, no esta definido el alto y largo ya que quise utilizar el del figma y quedaba muy grande.
export default function Button({ type, text }) {
  return (
    <button
      type={type}
      className="py-2 px-6 bg-[#2C4692] text-white text-base font-medium rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-200 mx-auto block"
    >
      {text}
    </button>
  );
}