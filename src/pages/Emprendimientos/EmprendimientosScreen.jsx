import { Carrusel } from "../../components";
import DisplayEmprendimientos from "./components/displayEmprendimientos";

export default function EmprendimientosScreen() {
  return (
    <>
      <div className="mt-5">
        <Carrusel />
      </div>
      <div className="-mt-10">
        <DisplayEmprendimientos />
      </div>
    </>
  );
}
