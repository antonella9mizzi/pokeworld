import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PokeListItem from "../components/PokeListItem";
import { Box, Button, Grid } from "@mui/material";
import { darken, styled, useTheme } from "@mui/system";
import { getContrastFromHex } from "../utils/utils";

type IProps = {
  loading: boolean;
  setLoading: Function;
  reachedEnd: boolean;
  setReachedEnd: Function;
  updateAllData: Function;
};

const ButtonC = styled("button")(({ theme }) => ({}));
const MPokeList = (props: IProps) => {
  const { loading, setLoading, updateAllData } = props;
  const pokemons = useSelector((state: any) => state.Pokemons);
  const containerRef = useRef<any>(null);
  const theme = useTheme();
  const handleLoadMore = () => {
    if (loading) {
      return;
    }
    setLoading(true);

    // Fetch more data using the fetchMoreData function
    updateAllData(pokemons.length, 16)
      .then(() => {
        setLoading(false);
      })
      .catch((error: any) => {
        console.error("Error fetching more data:", error);
        setLoading(false);
      });
  };

  return (
    <>
      <div
        ref={containerRef}
        style={{ backgroundColor: theme?.palette?.primary?.dark }}
      >
        <Grid container spacing={2} sx={{ padding: "3% 5%" }}>
          {pokemons.map((pokemon: any, index: number) => {
            return (
              <Grid item xs={6} md={3} key={index}>
                <PokeListItem data={pokemon} />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: theme?.palette?.primary?.dark,
        }}
      >
        <Button
          onClick={handleLoadMore}
          variant="contained"
          sx={{
            backgroundColor: "#FFCB05",
            fontWeight: 700,
            borderRadius: 20,
            color: getContrastFromHex("#FFCB05"),
            textAlign: "center",
            "&:hover": {
              backgroundColor: "#F5C400",
            },
          }}
        >
          Load More
        </Button>
      </div>
    </>
  );
};

export default MPokeList;
