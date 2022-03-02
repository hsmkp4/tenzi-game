import { useSpring, a } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import Text from "./Text";

function Boxes({ datas, handleHoldDice, isStart }) {
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
  // const obj = useSpring({ position: isStart ? [0, 0, 0] : [0, -28, 0] });
  // console.log(randomPose);
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    // if (elapsed <= 2) {
    //   ref.current.position.y += elapsed * 0.01 + 0.095;
    // }
    // ref.current.pos
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
        />
      ))}
    </group>
  );
}

export default Boxes;
