import { useFrame } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import Box from './Box';
import Text from './Text';

function Boxes({ datas }) {
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
  console.log(randomPose);
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    //1
    // ref.current.rotation.y = elapsed * 0.4;

    //2
    // ref.current.rotation.y = (Math.sin(elapsed) * Math.PI) / 16;
  });
  return (
    <group ref={ref}>
      {/* fix position */}
      {/* {boxPositions.map((el, i) => (
        <Box pos={el} key={i} />
      ))} */}
      {/* random position */}
      {randomPose.map((el, i) => (
        // <Box pos={el} key={i} />
        <Text
          pos={el}
          key={i}
          children={`${datas[i].diceNum}`}
          hAlign="right"
        />
      ))}
    </group>
  );
}

export default Boxes;
