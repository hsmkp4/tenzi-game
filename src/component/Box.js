import React from 'react';

function Box({ pos = [1, 1, 1], size = [0.5, 0.5, 0.5] }) {
  return (
    <mesh position={pos}>
      <boxBufferGeometry args={size} />
      <meshStandardMaterial />
    </mesh>
  );
}

export default Box;
