import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

function Main({ children }) {
  const scene = useRef();
  const { gl, camera } = useThree();
  useFrame(() => {
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(scene.current, camera);
  }, 2);
  return <scene ref={scene}>{children}</scene>;
}

export default Main;
