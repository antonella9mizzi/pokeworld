import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Pokemons: [],
};

export const pokemonSlice = createSlice({
  name: "Pokemons",
  initialState,
  reducers: {
    addPokemons: (state: any, action: any) => {
      const newPokemon = action.payload;
      const existingPokemonIndex = state.Pokemons.findIndex(
        (pokemon: any) => pokemon.id === newPokemon.id
      );
      if (existingPokemonIndex === -1) {
        // Add the new Pokémon only if it doesn't exist in the state
        state.Pokemons = [...state.Pokemons, newPokemon];
      }
    },
  },
});

export const { addPokemons } = pokemonSlice.actions;

export default pokemonSlice.reducer;
