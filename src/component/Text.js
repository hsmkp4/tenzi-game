import * as THREE from "three";
import React, {
  useMemo,
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import boldUrl from "./bold.bolb";
import { useSpring, a } from "@react-spring/three";

extend({ TextGeometry });

export default function Text({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 1.5,
  color = "#000000",
  pos,
  handleHoldDice,
  data,

  ...props
}) {
  //functionality and animate
  const [isHover, setIsHover] = useState(false);
  const [isHold, setIsHold] = useState(false);
  const mesh = useRef();
  const textG = useRef();

  const handleHover = (e) => {
    e.stopPropagation();
    setIsHover((pre) => !pre);
  };

  const handleIsHold = (e) => {
    e.stopPropagation();
    setIsHold((pre) => !pre);
    handleHoldDice(data.id);
  };

  const randomNum = useMemo(() => 0.5 + Math.random(), []);

  const obj = useSpring({
    scale: data.isHold ? 1.2 : 1,
  });

  //
  const font = useLoader(FontLoader, boldUrl);
  const config = useMemo(
    () => ({
      font,
      size: 40,
      height: 30,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 6,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 6,
    }),
    [font]
  );
  useLayoutEffect(() => {
    const size = new THREE.Vector3();
    mesh.current.geometry.computeBoundingBox();
    mesh.current.geometry.boundingBox.getSize(size);
    mesh.current.position.x =
      hAlign === "center" ? -size.x / 2 : hAlign === "right" ? 0 : -size.x;
    mesh.current.position.y =
      vAlign === "center" ? -size.y / 2 : vAlign === "top" ? 0 : -size.y;
  }, [children]);

  // animation
  const upDownMove = (t) =>
    t < 0.5 ? 10 * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    const t = upDownMove((1 + Math.sin(elapsed * randomNum)) / 2);

    if (!data.isHold) {
      textG.current.rotation.y = Math.sin(elapsed * randomNum);
      textG.current.rotation.z = Math.cos(elapsed * randomNum * 2);

      textG.current.position.y = pos[1] + 1 - Math.sin(t * 3);
    }
  });

  return (
    <group
      {...props}
      position={pos}
      scale={[0.01 * size, 0.01 * size, 0.005]}
      ref={textG}
    >
      <a.mesh
        onPointerOver={handleHover}
        onPointerOut={handleHover}
        onClick={handleIsHold}
        scale={obj.scale}
        ref={mesh}
      >
        <textGeometry args={[children, config]} />
        <meshStandardMaterial
          color={data.isHold ? "orange" : isHover ? "red" : "steelblue"}
          metalness={0.4}
          roughness={0.1}
        />
      </a.mesh>
    </group>
  );
}
