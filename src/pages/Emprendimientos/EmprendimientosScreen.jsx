import { Carrusel } from "../../components";
import Footer from "../../components/Footer/Footer";
import { Outlet, useParams } from "react-router"; // 👈 Importamos Outlet
import DisplayEmprendimientos from "./components/displayEmprendimientos";
import emprendimientos from "../../utils/emprendimientoMock.json";

// function DisplayEmprendimientos() {
//   return (
//     <div className="flex justify-center">
//       <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 p-3 m-2">
//         {emprendimientos.map((item) => (
//           <CardEmprendimiento
//             key={item.id}
//             id={item.id}
//             nombre={item.nombre}
//             descripcion={item.descripcion}
//             categoria={item.categoria}
//             imagen={item.imagen}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

export default function EmprendimientosScreen() {
  return (
    <>
      <div className="mt-2">
        <Carrusel />
      </div>
      <div className="-mt-10">
        <DisplayEmprendimientos />
      </div>
    </>
  );
}
