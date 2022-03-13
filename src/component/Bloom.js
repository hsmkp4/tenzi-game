import { extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

extend({ EffectComposer, UnrealBloomPass, RenderPass });

function Bloom({ children }) {
  const composer = useRef();
  const { gl, camera, size } = useThree();
  const [scene, setScene] = useState();
  const newGl = gl;
  useEffect(
    () => scene && composer.current.setSize(size.width, size.height),
    [size]
  );
  useFrame(() => scene && composer.current.render(), 1);

  newGl.setClearColor("#222", 0.07);

  return (
    <>
      <scene ref={setScene}>{children}</scene>
      <effectComposer ref={composer} args={[newGl]}>
        <renderPass
          attachArray="passes"
          scene={scene}
          camera={camera}
        ></renderPass>
        <unrealBloomPass
          attachArray="passes"
          args={[undefined, 0.5, 1, -2]}
        ></unrealBloomPass>
      </effectComposer>
    </>
  );
}

export default Bloom;
