import React from 'react';

function BasePlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, 0]} recieveShadow>
      <planeBufferGeometry args={[25, 25]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default BasePlane;
