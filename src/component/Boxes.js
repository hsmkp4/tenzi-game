import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import Text from "./Text";

function Boxes({ datas, handleHoldDice }) {
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
  // console.log(randomPose);
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
  });
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
        />
      ))}
    </group>
  );
}

export default Boxes;
