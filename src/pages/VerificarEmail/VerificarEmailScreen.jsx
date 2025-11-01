import { useVerificarEmail } from "../../hooks/useVerificarEmail";

export default function VerificarEmailScreen() {
  const { verificando } = useVerificarEmail();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <h2 className="text-[#2C4692] text-2xl font-semibold mb-4">
          {verificando ? "Verificando tu correo..." : "Redirigiendo..."}
        </h2>

        {verificando && (
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#2C4692]"></div>
          </div>
        )}

        <p className="text-gray-600">
          {verificando
            ? "Estamos validando tu cuenta. Esto puede tardar unos segundos."
            : "Gracias por verificar tu correo."}
        </p>
      </div>
    </div>
  );
}