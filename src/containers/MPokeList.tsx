import React, { useRef } from "react";
import { useSelector } from "react-redux";
import PokeListItem from "../components/PokeListItem";
import { Button, Grid } from "@mui/material";
import { useTheme } from "@mui/system";
import { getContrastFromHex } from "../utils/utils";
import Loading from "../components/Loading";

type IProps = {
  updateAllData: Function;
  loading: boolean;
};

const MPokeList = (props: IProps) => {
  const { updateAllData, loading } = props;
  const pokemons = useSelector((state: any) => state.Pokemons);
  const containerRef = useRef<any>(null);
  const theme = useTheme();
  const handleLoadMore = () => {
    // Fetch more data using the fetchMoreData function
    updateAllData(pokemons.length, 16).catch((error: any) => {
      console.error("Error fetching more data:", error);
    });
  };

  return (
    <>
      <div
        ref={containerRef}
        style={{ backgroundColor: theme?.palette?.primary?.dark }}
      >
        <Grid
          container
          spacing={2}
          sx={{ padding: "3% 5%", minHeight: "100vh" }}
        >
          {!loading && pokemons ? (
            pokemons.map((pokemon: any, index: number) => {
              return (
                <Grid item xs={6} md={3} key={index}>
                  <PokeListItem data={pokemon} />
                </Grid>
              );
            })
          ) : (
            <Loading />
          )}
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
