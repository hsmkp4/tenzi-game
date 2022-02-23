import { useFrame } from '@react-three/fiber';
import React, { useMemo, useRef, useState } from 'react';
import { useSpring, a } from '@react-spring/three';

const upDownMove = (t) =>
  t < 0.5 ? 10 * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

function Box({ data, pos = [1, 1, 1], size = [0.5, 0.5, 0.5] }) {
  const [isHover, setIsHover] = useState(false);
  const [isHold, setIsHold] = useState(false);
  const mesh = useRef();

  const handleHover = () => {
    setIsHover((pre) => !pre);
  };

  const handleIsHold = () => {
    setIsHold((pre) => !pre);
  };

  const randomNum = useMemo(() => 0.5 + Math.random(), []);

  const obj = useSpring({
    scale: isHold ? 1.2 : 1,
  });
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    const t = upDownMove((1 + Math.sin(elapsed * randomNum)) / 2);
    // 1 deform all!!! so bad

    // mesh.current.position.x =
    //   Math.sin(clock.getElapsedTime()) * Math.floor(Math.random() * 1.2) +
    //   pos[0];
    // mesh.current.position.z =
    //   Math.cos(clock.getElapsedTime()) * Math.floor(Math.random() * 1.2) +
    //   pos[2];

    // 2 not bad for shaking

    // mesh.current.rotation.x =
    //   Math.random() + Math.sin(elapsed * 0.001) + Math.round(Math.random() * 3);

    // 3 testing another way

    // if (!isHold) {
    //   mesh.current.rotation.x =
    //     Math.sin(elapsed * 0.8) +
    //     Math.cos(elapsed * 0.2) * (Math.random() - 0.5) * 0.1;
    //   mesh.current.rotation.y =
    //     Math.sin(elapsed * 0.8) + Math.cos(elapsed * 0.2);
    // }

    // 4 bad as f***

    // mesh.current.rotation.y = mesh.current.position.y + t;
    // mesh.current.scale.y = 1 + t * 0.1;
    // 5 good  ==>>>>>>> choise  1

    if (!isHold) {
      mesh.current.rotation.y = Math.sin(elapsed * randomNum);
      mesh.current.rotation.z = Math.cos(elapsed * randomNum * 2);

      mesh.current.position.y = pos[1] + 1 - Math.sin(t * 3);
    }

    // 6 not bad
    // if (!isHold) {
    //   mesh.current.rotation.y = Math.sin(elapsed * randomNum * 5);
    //   mesh.current.rotation.z = Math.cos(elapsed * randomNum * 10);
    // }

    // 7 not bad =====>>>>>>>>>> choice 2
    // mesh.current.position.x = pos[0] + Math.sin(t * 2 * randomNum);
    // mesh.current.position.y = pos[1] + Math.sin(elapsed * randomNum);
    // mesh.current.position.z = pos[2] + Math.sin(elapsed * randomNum);
  });
  return (
    <a.mesh
      position={pos}
      onPointerOver={handleHover}
      onPointerOut={handleHover}
      onClick={handleIsHold}
      ref={mesh}
      scale={obj.scale}
      castShadow
      receiveShadow
    >
      <boxBufferGeometry args={size} />
      <meshStandardMaterial
        color={isHold ? 'orange' : isHover ? 'red' : 'steelblue'}
        metalness={0.4}
        roughness={0.1}
      />
    </a.mesh>
  );
}

export default Box;
