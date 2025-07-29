import React from 'react'
import PerfilUsuario from '../../../components/PerfilUsuario'
import usuarios from '../../../utils/usuarioMock.json'
import NavBar from '../../../components/NavBar';


const PerfilUsuarioScreen = () => {
    const usuarioMock = usuarios.find(item => item.id === "1");

    if (!usuarioMock) return <div>Cargando...</div>

    return (
        <div>
            <NavBar/>
            <PerfilUsuario usuario={usuarioMock} />
        </div>
    )
}

export default PerfilUsuarioScreen
