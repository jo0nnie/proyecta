
import CrearPlanForm from "./components/CrearPlanForm"
export default function CrearPlan() {
  return (
    <div className="max-w-xl mx-auto mt-7 p-6 bg-white shadow-md rounded mb-7">
      <h2 className="text-2xl font-bold mb-4 text-[#2B4590] text-center">Crear plan</h2>
      <CrearPlanForm />
    </div>
  )

}
// {
//     "nombre": "Impulso Inicial", string
//     "descripcion": "Acceso completo a todas las funciones", string
//     "duracion": 1
//     "precio": 100.00 float
// }