import { useSpring, a } from "@react-spring/three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { DefaultLoadingManager } from "three";
import { LoadingManager } from "three";
import Text from "./Text";

// extend({LoadingMab})

function Boxes({ datas, handleHoldDice, gameDiff, reset, setLoaderState }) {
  const ref = useRef();
  const { viewport } = useThree();

  const randomPose = useMemo(() => {
    return new Array(10)
      .fill()
      .map((el, i) => [
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 4,
      ]);
  }, []);
  // console.log(viewport.width);
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
  });

  // DefaultLoadingManager.onStart = () => {
  //   console.log("started");
  // };

  DefaultLoadingManager.onLoad = (url, itemsLoaded, itemsTotal) => {
    console.log("loded");
    setLoaderState(true);
  };
  useEffect(() => {}, []);
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
