import React, { useEffect, useState } from "react";
import { Route, Routes as Switch } from "react-router-dom";
import MPokeList from "./MPokeList";
import MPokeDescription from "./MPokeDescription";
import { useDispatch } from "react-redux";
import { addPokemons } from "../redux/pokemonSlice";
import Footer from "../components/Footer";
import Header from "../components/Header";
const MWrapper = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const getDetails = (pokemonUrl: string) => {
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

  const updateAllData = (offset: any, limit: any) => {
    return new Promise<void>((resolve, reject) => {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then((response) => response.json())
        .then((data) => {
          const pokemonUrls = data.results.map((pokemon: any) => pokemon.url);

          // Fetch data for each Pokemon URL
          Promise.all(pokemonUrls.map(getDetails))
            .then(() => {
              console.log("Additional Pokemon data fetched and dispatched.");
              resolve(); // Resolve the Promise when the data is fetched
            })
            .catch((error) => {
              console.error("Error fetching additional Pokemon data:", error);
              reject(error); // Reject the Promise on error
            });
        })
        .catch((error) => {
          console.error("Error fetching additional data:", error);
          reject(error); // Reject the Promise on error
        });
    });
  };
  const getAllData = () => {
    setLoading(true);
    fetch("https://pokeapi.co/api/v2/pokemon?limit=16&offset=0")
      .then((response) => response.json())
      .then((data) => {
        // Extract the array of Pokemon URLs
        const pokemonUrls = data.results.map((pokemon: any) => pokemon.url);

        // Fetch data for each Pokemon URL
        Promise.all(pokemonUrls.map(getDetails))
          .then(() => {
            setLoading(false);
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
  };

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route
          path="/"
          element={
            <MPokeList updateAllData={updateAllData} loading={loading} />
          }
        />
        <Route path="/pokemon/:id" element={<MPokeDescription />} />
      </Switch>
      <Footer />
    </>
  );
};

export default MWrapper;
