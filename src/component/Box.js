import React, { useState } from 'react';

function Box({ data, pos = [1, 1, 1], size = [0.5, 0.5, 0.5] }) {
  const [isHover, setIsHover] = useState(false);
  const [isHold, setIsHold] = useState(false);

  const handleHover = () => {
    setIsHover((pre) => !pre);
  };

  const handleIsHold = () => {
    setIsHold((pre) => !pre);
  };

  return (
    <mesh
      position={pos}
      onPointerOver={handleHover}
      onPointerOut={handleHover}
      onClick={handleIsHold}
    >
      <boxBufferGeometry args={size} />
      <meshStandardMaterial
        color={isHold ? 'orange' : isHover ? 'red' : 'steelblue'}
      />
    </mesh>
  );
}

export default Box;
