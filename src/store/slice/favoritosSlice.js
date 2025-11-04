import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lista: [],
};

const favoritosSlice = createSlice({
    name: "favoritos",
    initialState,
    reducers: {
        toggleFavorito: (state, action) => {
            if (!state.lista) state.lista = []; 

            const favorito = action.payload;
            const id =
                favorito.emprendimientoId || favorito.emprendimiento?.id || favorito.id;

            const index = state.lista.findIndex(
                (item) =>
                    item.emprendimientoId === id || item.emprendimiento?.id === id
            );

            if (index >= 0) {
                state.lista.splice(index, 1);
            } else {
                state.lista.push(favorito);
            }
        },
        setFavoritos: (state, action) => {
            state.lista = action.payload || [];
        },
    },
});



export const { setFavoritos, toggleFavorito, clearFavoritos } = favoritosSlice.actions;
export default favoritosSlice.reducer;