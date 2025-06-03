import Container from './Container';
import TextField from './TextField';
import Button from './Button';

/**
 * Componente TestForm (lo cree para testear los componentes del ticket y mostrar algo al recargar la página, si quieren pueden borrarlo)
 * @returns 
 * Renderiza un form con los componentes creados en el ticket <PRO-9>
 * Envia un console.log de los datos ingresados en los inputs
 */


export default function TestForm({title}) {
  // esta const es para manejar el evento del formulario
  const handleSubmit = (evento) => {
    //previene la recarga de la pagina (lo que usualmente hace un form html)
    evento.preventDefault();
    //creo una const de formdata para agregar los datos y luego debo crear un objeto para poder guardarlos
    const formData = new FormData(evento.target)
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    // el print de consola
    console.log(data);
  };

  return (
    //aca utilizo el component Container, TextField y Button.
    <Container>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <h3 className="text-[#2C4692] text-2xl font-medium">{title}</h3>
        <TextField
          label="Your email"
          type="email"
          name="email"
          placeholder="example@example.com"
        />
        <TextField
          label="Your Password"
          type="password"
          name="password"
          placeholder="********"
        />
        <Button 
        type = "submit"
        text="Log in" />
      </form>
    </Container>
  );
}

