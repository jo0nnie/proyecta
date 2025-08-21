import AjusteItem from "./components/AjusteItem";
import MetodosDePago from "./components/MetodosDePago";

export default function AjustesScreen() {
    return (
        <>
            <h2 className="text-2xl font-bold pl-7 pt-5" style={{ color: "#2C4391" }}>
                Ajustes
            </h2>
            <div className="ml-7 mr-7 mb">
                <div className="border-b border-[#2C4692] pt-8"></div>
            </div>

            <AjusteItem
                titulo="Cambiar contraseña"
                descripcion="Cambia la contraseña de tu cuenta desde acá"
                textoBoton="Cambiar contraseña"
                // esto es solo para probar que funciona el boton
                onClick={() => console.log("Clic en cambiar contraseña")}
            />

            <AjusteItem
                titulo="Cambiar email"
                descripcion="Actualiza tu correo electrónico principal"
                textoBoton="Cambiar email"
            />

            {/* este es el "children" que recibe AjusteItem y se muestra con un margen arriba */}
            <AjusteItem>
                <MetodosDePago />
            </AjusteItem>

            <AjusteItem
                titulo="Eliminar cuenta"
                descripcion="Esta acción borrara unicamente su cuenta sin afectar a su emprendimiento (si tiene alguno)"
                textoBoton="Eliminar"
                colorBoton="#060F2A"
            />

            <AjusteItem
                titulo="Eliminar todo"
                descripcion="Esta acción borrara TODOS los datos de la cuenta, incluyendo emprendimientos (si tiene alguno)"
                textoBoton="Eliminar todo"
                colorBoton="#060F2A"
                //lo mismo que el anterior jej
                onClick={() => console.log("Clic en borrar todo")}
            />
        </>
    );
}
