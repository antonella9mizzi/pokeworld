import React from "react";
import { useTheme } from "@mui/system";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type IProps = {
  data: any;
};
const PokeListItem = (props: IProps) => {
  const { data } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Card
      sx={{
        width: "-webkit-fill-available",
        fontFamily: "Roboto",
        margin: "0.5%",
        height: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        [theme?.breakpoints?.down(601)]: {
          height: "fit-content",
        },
      }}
    >
      <CardActionArea
        sx={{ height: "78%" }}
        onClick={() => {
          navigate(`pokemon/${data?.id}`);
        }}
      >
        <CardMedia
          component="img"
          image={data?.sprites?.front_default}
          alt={data?.name}
          sx={{ height: "100%", objectFit: "contain" }}
          loading="lazy"
        />
      </CardActionArea>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          [theme?.breakpoints?.down(601)]: {
            flexDirection: "column",
          },
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textTransform: "capitalize", marginBottom: 0 }}
        >
          {data?.name}
        </Typography>

        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={() => {
            navigate(`pokemon/${data?.id}`);
          }}
          sx={{
            borderRadius: 12,
          }}
        >
          <AddRounded /> details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PokeListItem;
