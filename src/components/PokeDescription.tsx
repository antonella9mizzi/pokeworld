import React from "react";
import { useNavigate } from "react-router-dom";
type IProps = {
  data: any;
};
const PokeDescription = (props: IProps) => {
  const { data } = props;
  console.log("data", data);

  const navigate = useNavigate();
  return (
    <div>
      <p>pokedex #{data?.id}</p>
      {data?.name}
      <img src={data?.sprites?.front_default} alt={`${data?.name}-front`} />
      <img src={data?.sprites?.back_default} alt={`${data?.name}-back`} />
      <p>types:</p>
      <div>
        {data?.types?.map((elem: any, index: number) => {
          return <span key={index}>{elem?.type?.name}</span>;
        })}
      </div>
      <p>stats:</p>
      <div>
        {data?.stats?.map((stat: any, index: number) => {
          return (
            <span key={index}>
              {stat?.stat?.name}: {stat?.base_stat}
            </span>
          );
        })}
      </div>
      <p>
        total stats:
        <span>
          {data?.stats
            ?.map((stat: any) => {
              return stat?.base_stat;
            })
            .reduce((a: any, b: any) => {
              return a + b;
            })}
        </span>
      </p>
      <p>height:{data?.height}</p>
      <p>weight:{data?.weight}</p>
      <p>Evolution:</p>
      <div>
        {data?.evolution_chain.map((elem: any, index: number) => {
          return (
            <div
              key={index}
              onClick={() => {
                navigate(`/pokemon/${elem?.id}`, { replace: true });
              }}
            >
              {elem?.name}
              <img src={elem?.sprites?.front_default} alt={elem?.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokeDescription;
