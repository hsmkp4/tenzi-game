import { useSpring, a } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import Text from "./Text";

function Boxes({ datas, handleHoldDice, gameDiff, reset }) {
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

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
  });

  return (
    <group
      ref={ref}
      //  position={[0, -12, 0]}
    >
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
