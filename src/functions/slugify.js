//esta funcion se creo para modíficar la categoría y que cumpla las reglas de escrituras de un id normal.
export default function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD") // elimina tildes
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-") // reemplaza espacios por guiones
    .replace(/[^\w-]+/g, ""); // elimina caracteres especiales
}
