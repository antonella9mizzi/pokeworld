import React from "react";
import { useSelector } from "react-redux";
// type IProps = {
//   pokemons: any;
// };
const PokeList = () => {
  const pokemons = useSelector((state: any) => state.Pokemons);

  return (
    <div>
      {pokemons.map((pokemon: any, index: number) => {
        return <div key={index}>{pokemon?.name}</div>;
      })}
    </div>
  );
};

export default PokeList;
