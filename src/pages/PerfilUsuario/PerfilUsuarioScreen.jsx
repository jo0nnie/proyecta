import React from 'react'
import PerfilUsuario from '../../components/PerfilUsuario';

const PerfilUsuarioScreen = () => {
    const usuarioMock = usuarios.find(item => item.id === "1");

    if (!usuarioMock) return <div>Cargando...</div>

    return (
        <div>
            <PerfilUsuario usuario={usuarioMock} />
        </div>
    )
}

export default PerfilUsuarioScreen
