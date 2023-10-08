import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PokeListItem from "../components/PokeListItem";
import { Box, Grid } from "@mui/material";

type IProps = {
  loading: boolean;
  setLoading: Function;
  reachedEnd: boolean;
  setReachedEnd: Function;
  updateAllData: Function;
};
const MPokeList = (props: IProps) => {
  const { loading, reachedEnd, setLoading, setReachedEnd, updateAllData } =
    props;
  const pokemons = useSelector((state: any) => state.Pokemons);
  const containerRef = useRef<any>(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (reachedEnd || loading) {
        return;
      }
      const isAtBottom: boolean =
        container.scrollTop + container.clientHeight + 10 >=
        container.scrollHeight;

      if (isAtBottom) {
        setLoading(true);

        // Fetch more data using the fetchMoreData function
        updateAllData(pokemons?.length, 16)
          .then(() => {
            // Set loading state and handle reaching the end
            setLoading(false);
            if (pokemons?.length >= 70) {
              setReachedEnd(true);
            }
          })
          .catch((error: any) => {
            console.error("Error fetching more data:", error);
            setLoading(false);
          });
      }
    };

    // Attach a scroll event listener to implement infinite scroll
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [pokemons, reachedEnd, loading]);

  return (
    <div
      style={{
        overflowY: "scroll",
        height: "90vh",
      }}
      ref={containerRef}
    >
      <Grid container spacing={2}>
        {pokemons.map((pokemon: any, index: number) => {
          return (
            <Grid item xs={6} md={3} key={index}>
              <PokeListItem data={pokemon} />
            </Grid>
          );
        })}
      </Grid>
      {loading && <>...loading</>}
    </div>
  );
};

export default MPokeList;
