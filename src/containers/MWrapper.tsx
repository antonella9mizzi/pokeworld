import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import MPokeList from "./MPokeList";
import MPokeDescription from "./MPokeDescription";
import { useDispatch } from "react-redux";
import { addPokemons } from "../redux/pokemonSlice";
const MWrapper = () => {
  const dispatch = useDispatch();

  const getAllData = (pokemonUrl: string) => {
    fetch(pokemonUrl)
      .then((response) => response.json())
      .then((pokeData) => {
        // Dispatch the action to add a single Pokemon to the store
        dispatch(addPokemons(pokeData));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
      .then((response) => response.json())
      .then((data) => {
        // Extract the array of Pokemon URLs
        const pokemonUrls = data.results.map((pokemon: any) => pokemon.url);

        // Fetch data for each Pokemon URL
        Promise.all(pokemonUrls.map(getAllData))
          .then(() => {
            // All Pokemon data is fetched and dispatched
            console.log("All Pokemon data fetched and dispatched.");
          })
          .catch((error) => {
            console.error("Error fetching Pokemon data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);
  return (
    <Switch>
      <Route path="/" element={<MPokeList />} />
      <Route path="/pokemon/:id" element={<MPokeDescription />} />
    </Switch>
  );
};

export default MWrapper;
