import React from "react";
import PokeDescription from "../components/PokeDescription";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MPokeDescription = () => {
  const { id } = useParams();
  const pokemons = useSelector((state: any) => state.Pokemons);
  const pokemon = pokemons?.find((p: any) => p.id === Number(id));

  return (
    <div>
      {pokemon ? (
        <PokeDescription data={pokemon} />
      ) : (
        <div>Pokemon not found.</div>
      )}
    </div>
  );
};

export default MPokeDescription;
