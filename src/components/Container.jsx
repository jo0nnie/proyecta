// aca tengo el componente Container que devuelve un div con una prop de elemento children dentro
export default function Container({ children, className }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}