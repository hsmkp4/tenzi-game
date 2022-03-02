import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export default function Particles({ count = 2000 }) {
  const mesh = useRef();
  const light = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor } = particle;

      t = particle.t += speed / 16;
      const a = Math.cos(t) + ((Math.sin(t * 1) / 2) * Math.sin(t * t)) / 2;
      const b = Math.sin(t) + ((Math.cos(t * 2) / 2) * Math.cos(t * t)) / 2;
      const s = Math.cos(t);

      dummy.position.set(
        a +
          yFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        b +
          xFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        b +
          xFactor +
          Math.cos((t / 2) * factor) +
          (Math.sin(t * 3) * factor) / 2
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 15, s * 5, s * 15);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      <pointLight ref={light} distance={40} intensity={10} color="red" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereBufferGeometry args={[0.05, 1, 1]} />
        <meshPhongMaterial color="#FFD700" />
      </instancedMesh>
    </>
  );
}
