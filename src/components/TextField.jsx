
/**
 * Componente TextField
 * @returns 
 * Renderiza:
 * div con position flex column y un gap 2 para separar
 * Etiqueta label para que el usuario pueda visualizar que datos ingresar en los Inputs, htmlFor da informacion a que input se refiere.
 * Etiqueta Input con propo de tipo, nombre y un placeholder de ejemplo (perdon no estaba en el figma)
 * Envia un console.log de los datos ingresados en los inputs
 */

export default function TextField({ label, type, name, placeholder }) {
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={name}
                className="text-primary-500 text-sm font-medium"
            >
                {label}
            </label>
            <input type={type} name={name} placeholder={placeholder}
                className="border-2 border-primary-500 rounded-[10px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2C4692]"
            />
        </div>
    );
}
