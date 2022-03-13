import { useMemo, useRef, useLayoutEffect, useState } from "react";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import boldUrl from "./bold.bolb";
import { useSpring, a } from "@react-spring/three";
import { Vector3 } from "three";

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
  reset,
  gameDiff,
  theme,
  ...props
}) {
  const [isHover, setIsHover] = useState(false);
  const mesh = useRef();
  const textG = useRef();

  const handleHover = (e) => {
    e.stopPropagation();
    setIsHover((pre) => !pre);
  };

  const handleIsHold = (e) => {
    e.stopPropagation();
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
    const size = new Vector3();
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
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    const t = upDownMove((1 + Math.sin(elapsed * randomNum)) / 2);

    if (!data.isHold && !reset && gameDiff === 1) {
      textG.current.position.y = pos[1] + Math.sin(randomNum * elapsed) / 2;
    }
    if (!data.isHold && !reset && gameDiff === 2) {
      textG.current.rotation.y = Math.sin(elapsed * randomNum);
      textG.current.rotation.z = Math.cos(elapsed * randomNum * 2);
      textG.current.position.y = pos[1] + 1 - Math.sin(t * 3);
    }

    if (!data.isHold && !reset && gameDiff === 3) {
      textG.current.rotation.y = Math.sin(elapsed * randomNum * t);
      textG.current.rotation.z = Math.cos(elapsed * randomNum * 2 * t);
      textG.current.position.x = pos[0] - randomNum - Math.sin(t * 5);
      textG.current.position.y = pos[1] + 1 - Math.sin(t * 5);
    }
    if (!data.isHold && !reset && gameDiff === 4) {
      textG.current.rotation.y =
        Math.sin(elapsed * randomNum * t) * 10 * randomNum;
      textG.current.rotation.x = Math.sin(elapsed * randomNum * t) * randomNum;
      textG.current.rotation.z = Math.cos(elapsed * randomNum * 2 * t) * t;
      textG.current.position.x =
        pos[0] - randomNum - Math.sin(randomNum * t) * 3;
      textG.current.position.y = pos[1] - randomNum + 1 - Math.sin(t * 2) * 2;
      textG.current.position.z = pos[2] - randomNum - Math.sin(randomNum * t);
    }
    if (reset) {
      textG.current.position.y -= randomNum / 20;
      textG.current.rotation.y = Math.sin(elapsed * randomNum) * 8;
      textG.current.rotation.z = Math.cos((elapsed * randomNum) / 2) * 10;
      textG.current.rotation.x = Math.sin(elapsed * randomNum * 3) / 4;
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
        {theme === "blue" && (
          <meshStandardMaterial
            color={data.isHold ? "#dfb452" : isHover ? "#c34" : "#4682b4"}
            metalness={0.4}
            roughness={0.1}
          />
        )}
        {theme === "purple" && (
          <meshStandardMaterial
            color={data.isHold ? "#e45e8f" : isHover ? "#252150" : "#6e1f78"}
            metalness={0.4}
            roughness={0.1}
          />
        )}
        {theme === "red" && (
          <meshStandardMaterial
            color={data.isHold ? "#d1cbb5" : isHover ? "#534e4e" : "#911251"}
            metalness={0.4}
            roughness={0.1}
          />
        )}
      </a.mesh>
    </group>
  );
}
