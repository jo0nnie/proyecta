// aca tengo el componente Container que devuelve un div con una prop de elemento children dentro

// TODO este componente es exactamente igual a "MainContainer"... eliminar uno
export default function Container({ children, className }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}