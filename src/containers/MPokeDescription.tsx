import React, { useEffect, useState } from "react";
import PokeDescription from "../components/PokeDescription";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPokemons } from "../redux/pokemonSlice";
import { styled } from "@mui/system";

const MPokeDescription = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const pokemons = useSelector((state: any) => state.Pokemons);
  const getAdditionalData = async () => {
    setLoading(true);
    try {
      let pokemon: any = {};
      // check if the Pokemon is already inside Redux store.
      if (!pokemons?.some((s: any) => s?.id === id)) {
        // if its not in the store then fetch the Pokemon data.
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        pokemon = await response.json();
        //and adds it to the store
        dispatch(addPokemons(pokemon));
      } else {
        // if pokemon is already in the store gets it from there
        pokemon = pokemons?.find((s: any) => s?.id === id);
      }

      const speciesUrl = pokemon?.species?.url;

      // fetches species data to be able to get evolution chain url
      const speciesResponse = await fetch(speciesUrl);
      const speciesData = await speciesResponse.json();

      // fetches actual evolution data of the pokemon
      const evolutionChainResponse = await fetch(
        speciesData?.evolution_chain?.url
      );
      const evolutionChain = await evolutionChainResponse.json();

      const evolution = [];
      const evolution_chain = evolutionChain.chain;
      evolution.push(evolution_chain?.species?.name);

      // iterates through the evolution data to get a list of names in order of evolution
      evolution_chain?.evolves_to?.forEach((elem: any) => {
        evolution.push(elem?.species?.name);
        if (elem?.evolves_to.length > 0) {
          elem.evolves_to.forEach((subelem: any) => {
            evolution.push(subelem?.species?.name);
          });
        }
      });

      const superEvolution = [];

      // builds an array of data for each evolution name saved before.
      for (const step of evolution) {
        if (step === pokemon?.name) {
          //if evolution step is from this pokemon then just pushes the data to array
          superEvolution.push(pokemon);
        } else {
          if (pokemons.some((poke: any) => poke?.name === step)) {
            //checks if i already have the data in store
            const findedPokemon = pokemons.find(
              (poke: any) => poke?.name === step
            );
            superEvolution.push(findedPokemon);
          } else {
            //fetches data if its not inside the store
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${step}`
            );
            const evStep = await response.json();
            //adds it to the store
            dispatch(addPokemons(evStep));
            superEvolution.push(evStep);
          }
        }
      }

      //sets new data
      const _newData = {
        ...pokemon,
        evolution_chain: [...superEvolution],
      };

      // Update the component's local state with the new data.
      setData(_newData);
      setLoading(false); // Set loading state to false as data fetching is complete.
    } catch (error) {
      console.error("Error fetching data:", error); // Handle and log any errors.
      setLoading(false); // Set loading state to false in case of an error.
    }
  };
  const Container = styled("div")(({ theme }) => ({
    padding: "3% 5%",

    backgroundColor: theme?.palette?.primary?.dark,
    [theme.breakpoints.down("md")]: {
      padding: "3% 32px",
    },
  }));
  useEffect(() => {
    getAdditionalData();
  }, [id]);
  return (
    <Container>
      {!loading && data ? (
        <PokeDescription data={data} />
      ) : (
        <div>...loading</div>
      )}
    </Container>
  );
};

export default MPokeDescription;
