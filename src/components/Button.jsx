export default function Button({ type, text, onClick }) {
  return (
    <div>
    <button
      type={type}
      className="py-2 px-6 bg-primary-500 text-dark-logo text-size-base font-medium rounded-[12px] shadow-md hover:bg-primary-600 transition-all duration-200 mx-auto block font-family-inter cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
    </div>
  );
}