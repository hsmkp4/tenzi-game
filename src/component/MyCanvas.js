import {
  CameraShake,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Bloom from "./Bloom";
import Boxes from "./Boxes";
import Lights from "./Lights";
import Main from "./Main";
import Particles from "./Particles";

function MyCanvas({
  gameDiff,
  datas,
  handleHoldDice,
  isStart,
  reset,
  setLoaderState,
  glitch,
}) {
  const cameraShakeCong = {
    maxYaw: 1,
    maxPitch: 1,
    maxRoll: 1,
    yawFrequency: 100,
    pitchFrequency: 100,
    rollFrequency: 100,
    intensity: 1,
    decay: true,
    decayRate: 0.75,
    additive: true,
  };
  return (
    <Canvas dpr={[1, 2]}>
      <Main>
        <Particles gameDiff={gameDiff} />
      </Main>
      <PerspectiveCamera
        position={reset ? [0, 6, 0] : [0, 0, 8]}
        fov={100}
        makeDefault={true}
      />
      <Suspense fallback={null}>
        <Bloom>
          <Boxes
            datas={datas}
            handleHoldDice={handleHoldDice}
            isStart={isStart}
            reset={reset}
            gameDiff={gameDiff}
            setLoaderState={setLoaderState}
          />
          <Lights />
        </Bloom>
      </Suspense>
      <OrbitControls />
      {glitch && <CameraShake {...cameraShakeCong} />}
    </Canvas>
  );
}

export default MyCanvas;
