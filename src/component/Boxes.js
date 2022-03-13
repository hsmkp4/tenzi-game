import { useEffect, useMemo, useRef } from "react";
import { DefaultLoadingManager } from "three";
import Text from "./Text";

// extend({LoadingMab})

function Boxes({
  datas,
  handleHoldDice,
  gameDiff,
  reset,
  setLoaderState,
  theme,
}) {
  const ref = useRef();

  const randomPose = useMemo(() => {
    return new Array(10)
      .fill()
      .map(() => [
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.3) * 5,
        (Math.random() - 0.7) * 6,
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
          theme={theme}
        />
      ))}
    </group>
  );
}

export default Boxes;
