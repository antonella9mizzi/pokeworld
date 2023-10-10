import { styled } from "@mui/system";
import React from "react";
import Lottie from "lottie-react";
import LoadingAnimation from "../utils/lotties/loading.json";
const AnimationContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "50%",
  transform: "translate(50%, -50%)",
}));
const Loading = () => {
  return (
    <AnimationContainer>
      <Lottie
        style={{ maxWidth: "200px" }}
        loop
        autoplay
        animationData={LoadingAnimation}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice",
        }}
      />
    </AnimationContainer>
  );
};

export default Loading;
