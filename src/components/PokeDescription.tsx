import React from "react";
type IProps = {
  data: any;
};
const PokeDescription = (props: IProps) => {
  const { data } = props;

  return <div>{data?.name}</div>;
};

export default PokeDescription;
