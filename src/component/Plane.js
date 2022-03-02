import { usePlane } from "@react-three/cannon";
import React from "react";

function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -16, 0],
  }));
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -16, 0]}>
      <planeBufferGeometry args={[100, 100]} />
      <meshStandardMaterial color="#333" />
    </mesh>
  );
}

export default Plane;
