export default function MainContainer({ children, className }) {
  return (
    <main className={className}>
      {children}
    </main>
  );
}