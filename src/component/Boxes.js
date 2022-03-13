import { useEffect, useMemo, useRef } from "react";
import { DefaultLoadingManager } from "three";
import Text from "./Text";

// extend({LoadingMab})

function Boxes({ datas, handleHoldDice, gameDiff, reset, setLoaderState }) {
  const ref = useRef();

  const randomPose = useMemo(() => {
    return new Array(10)
      .fill()
      .map((el, i) => [
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 4,
      ]);
  }, []);

  DefaultLoadingManager.onLoad = () => {
    setLoaderState(true);
  };
  return (
    <group ref={ref}>
      {randomPose.map((el, i) => (
        <Text
          pos={el}
          key={i}
          children={`${datas[i].diceNum}`}
          hAlign="right"
          handleHoldDice={handleHoldDice}
          data={datas[i]}
          reset={reset}
          gameDiff={gameDiff}
        />
      ))}
    </group>
  );
}

export default Boxes;
