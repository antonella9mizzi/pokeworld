import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PokeListItem from "../components/PokeListItem";
import { Box, Grid } from "@mui/material";
import { Theme, styled } from "@mui/system";

type IProps = {
  loading: boolean;
  setLoading: Function;
  reachedEnd: boolean;
  setReachedEnd: Function;
  updateAllData: Function;
};
const MPokeList = (props: IProps) => {
  const { loading, setLoading, updateAllData } = props;
  const pokemons = useSelector((state: any) => state.Pokemons);
  const containerRef = useRef<any>(null);
  const Container = styled("div")(({ theme }) => ({
    padding: "3% 5%",
    [theme.breakpoints.down("md")]: {
      padding: "3% 32px",
    },
  }));

  const handleScroll = () => {
    if (loading) {
      return;
    }

    setLoading(true);

    // Fetch more data using the fetchMoreData function
    updateAllData(pokemons?.length, 16)
      .then(() => {
        // Set loading state and handle reaching the end
        setLoading(false);
      })
      .catch((error: any) => {
        console.error("Error fetching more data:", error);
        setLoading(false);
      });
  };
  return (
    <Container ref={containerRef}>
      <Grid container spacing={2}>
        {pokemons.map((pokemon: any, index: number) => {
          return (
            <Grid item xs={6} md={3} key={index}>
              <PokeListItem data={pokemon} />
            </Grid>
          );
        })}
      </Grid>
      <button
        onClick={() => {
          handleScroll();
        }}
      >
        update
      </button>
    </Container>
  );
};

export default MPokeList;
