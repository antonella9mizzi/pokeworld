import React from "react";
import Logo from "../utils/Img/Logo.png";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const Container = styled("div")(({ theme }) => ({
    backgroundColor: theme?.palette?.primary?.dark,
    display: "flex",
    justifyContent: "center",
    "& img": {
      width: "25vw",
      cursor: "pointer",
      [theme.breakpoints.down("lg")]: {
        width: "25vw",
      },
    },
  }));
  return (
    <Container>
      <img
        src={Logo}
        alt="pokemon"
        onClick={() => navigate("/", { replace: true })}
      />
    </Container>
  );
};

export default Header;
