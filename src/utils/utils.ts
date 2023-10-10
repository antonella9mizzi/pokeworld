export const getContrastFromHex = (hexcolor: any) => {
  if (hexcolor?.slice(0, 1) === "#") {
    hexcolor = hexcolor?.slice(1);
  }

  if (hexcolor?.length === 3) {
    hexcolor = hexcolor
      ?.split("")
      ?.map((hex: any) => {
        return hex + hex;
      })
      ?.join("");
  }

  let r = parseInt(hexcolor?.substr(0, 2), 16);
  let g = parseInt(hexcolor?.substr(2, 2), 16);
  let b = parseInt(hexcolor?.substr(4, 2), 16);
  let yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? "black" : "white";
};

export const returnBgChip = (name: string) => {
  let backgroundColor = "#FFCB05";

  switch (name?.toLowerCase()) {
    case "normal":
      backgroundColor = "#FFCB05";

      break;
    case "fire":
      backgroundColor = "#FF3C38";

      break;
    case "water":
      backgroundColor = "#3163ED";

      break;
    case "grass":
      backgroundColor = "#BDC667";

      break;
    case "electric":
      backgroundColor = "#FFDC5E";

      break;
    case "ice":
      backgroundColor = "#26F0F1";
      break;
    case "fighting":
      backgroundColor = "#FF5964";

      break;
    case "poison":
      backgroundColor = "#5F4BB6";

      break;
    case "ground":
      backgroundColor = "#b8a890";

      break;
    case "flying":
      backgroundColor = "#A4D9F4";

      break;
    case "psychic":
      backgroundColor = "#EB7093";
      break;
    case "bug":
      backgroundColor = "#D16014";
      break;
    case "rock":
      backgroundColor = "#4A525A";
      break;
    case "ghost":
      backgroundColor = "#B2B2D2";
      break;
    case "dragon":
      backgroundColor = "#593C8F";
      break;
    case "dark":
      backgroundColor = "#02182B";
      break;
    case "steel":
      backgroundColor = "#adb5bd";
      break;
    case "fairy":
      backgroundColor = "#fb9bb2";
      break;
    default:
      break;
  }

  return backgroundColor;
};

export const returnStatPerc = (name: string, value: number) => {
  switch (name.toLowerCase()) {
    case "hp":
      return (value * 100) / 255;

    case "attack":
      return (value * 100) / 190;
    case "defense":
    case "special-defense":
      return (value * 100) / 230;
    case "special-attack":
      return (value * 100) / 194;
    case "speed":
      return (value * 100) / 180;
  }
};
