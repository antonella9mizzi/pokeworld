import { styled } from "@mui/system";
import React from "react";

const Footer = () => {
  const Container = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette?.primary.main,
    width: "calc(100%-60px)",
    // width: "100%",
    padding: 30,
    color: theme.palette?.primary.contrastText,
  }));

  return (
    <Container>
      <p style={{ textAlign: "center" }}> &#169; Made by Antonella Mizzi</p>
    </Container>
  );
};

export default Footer;
