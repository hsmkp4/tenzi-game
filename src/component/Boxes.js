import { useSpring, a } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import Text from "./Text";

function Boxes({ datas, handleHoldDice, isStart, reset }) {
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
  const { camera } = useThree();
  // const obj = useSpring({ position: isStart ? [0, 0, 0] : [0, -28, 0] });
  // console.log(randomPose);
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    //1- camera change to top and move group
    // if (reset) {
    //   ref.current.position.y = elapsed * 2;
    //   ref.current.rotation.z = Math.sin(elapsed);
    //   ref.current.rotation.x = Math.cos(elapsed);
    //   console.log("make it move out ");
    // }

    //2-camera move when game finished
    // camera.position.z = elapsed;
  });
  // useEffect(() => {
  //   if (!reset) {
  //     ref.current.position.set([0, 0, 0]);
  //     ref.current.rotation.set([0, 0, 0]);
  //   }
  // }, [reset]);
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
        />
      ))}
    </group>
  );
}

export default Boxes;
