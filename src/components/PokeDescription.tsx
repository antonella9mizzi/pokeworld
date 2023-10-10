import { Close, OpenInFullRounded } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  Grid,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { darken, styled, useTheme } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getContrastFromHex,
  returnBgChip,
  returnStatPerc,
} from "../utils/utils";
type IProps = {
  data: any;
};
const DivFlex = styled("div")(({ theme }) => ({
  display: "flex",
  position: "relative",
  marginTop: theme.spacing(1),
}));

const MainImg = styled("img")(({ theme }) => ({
  width: "20vw",
  margin: "2vh 2vw",
  backgroundColor: darken(theme?.palette?.primary.dark, 0.1),
  borderRadius: "50%",
}));

const Chip = styled("div")(({ theme }) => ({
  backgroundColor: "#FFDE00",
  padding: 12,
  width: 100,
  borderRadius: 20,
  color: "#B3A125",
  textAlign: "center",
  fontWeight: 700,
  fontSize: 24,
  letterSpacing: 0.1,
  position: "absolute",
  bottom: "-0.2vh",
}));
const MainImgXS = styled("img")(({ theme }) => ({
  backgroundColor: "#F2F2F2",
  borderRadius: "50%",
}));

const ChipXS = styled("div")(({ theme }) => ({
  backgroundColor: "#FFDE00",
  padding: "8px 20px",
  width: "fit-content",
  borderRadius: 20,
  color: "#B3A125",
  textAlign: "center",
  fontWeight: 600,
  fontSize: 12,
  letterSpacing: 0.1,
  textTransform: "uppercase",
  position: "absolute",
  bottom: "-18px",
}));
const Title = styled("p")(({ theme }) => ({
  color: darken(theme?.palette?.primary.dark, 0.3),
  fontWeight: 700,
}));

const TypeChip = styled("div")(({ theme }) => ({
  padding: "12px 24px",
  width: "fit-content",
  borderRadius: 20,
  textAlign: "center",
  fontWeight: 700,
  fontSize: 16,
  letterSpacing: 0.1,
}));

const EvolutionIndex = styled("div")(({ theme }) => ({
  backgroundColor: theme?.palette?.primary?.main,
  color: theme?.palette?.primary?.contrastText,
  borderRadius: "50%",
  width: 32,
  height: 32,
  fontWeight: 700,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "4px",
  left: "12px",
}));
const PokeDescription = (props: IProps) => {
  const { data } = props;
  const [dialog, setDialog] = useState<any>({
    open: false,
    selected: null,
  });
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <DivFlex
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MainImg
              src={data?.sprites?.front_default}
              alt={`${data?.name}-front`}
            />
            <Chip>
              #
              {(data?.id).toLocaleString("en-US", {
                minimumIntegerDigits: 4,
                useGrouping: false,
              })}
            </Chip>
          </DivFlex>
          <DivFlex
            style={{ flexDirection: "column", marginTop: theme.spacing(2) }}
          >
            <Card>
              <CardContent sx={{ padding: "24px" }}>
                <Title
                  style={{
                    textTransform: "uppercase",
                    fontSize: "32px",
                    marginTop: 0,
                  }}
                >
                  Evolution
                </Title>
                <Grid container spacing={1}>
                  {data?.evolution_chain.map((elem: any, index: number) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        lg={4}
                        key={index}
                        onClick={() => {
                          navigate(`/pokemon/${elem?.id}`, { replace: true });
                        }}
                        sx={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          marginBottom: "24px",
                        }}
                      >
                        <EvolutionIndex>{index + 1}&#186; </EvolutionIndex>
                        <MainImgXS
                          src={elem?.sprites?.front_default}
                          alt={elem?.name}
                        />
                        <ChipXS>{elem?.name}</ChipXS>
                      </Grid>
                    );
                  })}
                </Grid>
                <br />
              </CardContent>
            </Card>
          </DivFlex>
          <DivFlex
            style={{ flexDirection: "column", marginTop: theme.spacing(2) }}
          >
            <Card>
              <CardContent sx={{ padding: "24px" }}>
                <Title
                  style={{
                    textTransform: "uppercase",
                    fontSize: "32px",
                    marginTop: 0,
                  }}
                >
                  Gallery
                </Title>
                <Grid container spacing={1}>
                  {Object.keys(data?.sprites)?.map(
                    (elem: any, index: number) => {
                      return (
                        data?.sprites[elem] &&
                        elem !== "other" &&
                        elem !== "versions" && (
                          <Grid
                            item
                            lg={3}
                            key={index}
                            sx={{
                              position: "relative",
                            }}
                          >
                            <OpenInFullRounded
                              htmlColor="#C1C1C1"
                              fontSize="small"
                              sx={{
                                position: "absolute",
                                right: 4,
                                top: 11,
                              }}
                            />
                            <Card sx={{ boxShadow: "none" }}>
                              <CardActionArea
                                onClick={() => {
                                  setDialog({
                                    open: true,
                                    selected: {
                                      img: data?.sprites[elem],
                                      name: elem,
                                    },
                                  });
                                }}
                              >
                                <img
                                  src={data?.sprites[elem]}
                                  alt={`${data?.name}-${elem}`}
                                />
                              </CardActionArea>
                            </Card>
                          </Grid>
                        )
                      );
                    }
                  )}
                </Grid>
              </CardContent>
            </Card>
          </DivFlex>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Card style={{ width: "-webkit-fill-available" }}>
            <CardContent sx={{ padding: "24px" }}>
              <Title style={{ textTransform: "uppercase", fontSize: "32px" }}>
                {data?.name}
              </Title>
              <Title
                style={{
                  fontSize: "24px",
                }}
              >
                Type
              </Title>
              <DivFlex>
                {data?.types?.map((elem: any, index: number) => {
                  const bkg: string = returnBgChip(elem?.type?.name);
                  return (
                    <TypeChip
                      key={index}
                      style={{
                        backgroundColor: bkg,
                        color: getContrastFromHex(bkg),
                        textTransform: "capitalize",
                      }}
                      sx={{ marginRight: theme.spacing(1) }}
                    >
                      {elem?.type?.name}
                    </TypeChip>
                  );
                })}
              </DivFlex>
              <Title
                style={{
                  fontSize: "24px",
                }}
              >
                Stats
              </Title>
              <DivFlex style={{ flexDirection: "column" }}>
                {data?.stats?.map((stat: any, index: number) => {
                  return (
                    <DivFlex key={index} style={{ flexDirection: "column" }}>
                      <Title
                        style={{
                          fontSize: "16px",
                          margin: 0,
                          textTransform: "capitalize",
                        }}
                      >
                        {stat?.stat?.name}
                      </Title>
                      <LinearProgress
                        sx={{
                          height: 16,
                          borderRadius: 20,
                        }}
                        variant="determinate"
                        color="secondary"
                        value={Number(
                          returnStatPerc(
                            stat?.stat?.name,
                            stat?.base_stat
                          )?.toFixed(0)
                        )}
                      />
                    </DivFlex>
                  );
                })}
              </DivFlex>
              <Title
                style={{
                  fontSize: "16px",
                }}
              >
                Total stats:{" "}
                <span>
                  {data?.stats
                    ?.map((stat: any) => {
                      return stat?.base_stat;
                    })
                    .reduce((a: any, b: any) => {
                      return a + b;
                    })}
                </span>
              </Title>
              <Title
                style={{
                  fontSize: "16px",
                }}
              >
                Height: {data?.height}
              </Title>
              <Title
                style={{
                  fontSize: "16px",
                }}
              >
                Weight:{data?.weight}
              </Title>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        open={dialog.open}
        onClose={() => {
          setDialog({ ...dialog, open: false });
        }}
        maxWidth={"xs"}
        fullWidth
      >
        <IconButton
          onClick={() => {
            setDialog({ ...dialog, open: false });
          }}
          sx={{ position: "absolute", top: 8, right: 16 }}
        >
          <Close htmlColor="C1C1C1" />
        </IconButton>

        <Title sx={{ textTransform: "capitalize", textAlign: "center" }}>
          {dialog?.selected?.name?.replace("_", " ")}
        </Title>
        <img src={dialog?.selected?.img} alt={dialog?.selected?.name} />
      </Dialog>
    </>
  );
};

export default PokeDescription;
