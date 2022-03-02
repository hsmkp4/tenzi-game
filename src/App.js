import {
  CameraShake,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Glitch } from "@react-three/postprocessing";
import { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import Bloom from "./component/Bloom";
import Boxes from "./component/Boxes";
import Lights from "./component/Lights";
import DUMMY from "./data";
import { GlitchMode } from "postprocessing";
import { useSpring, a } from "@react-spring/three";

function App() {
  const [datas, setDatas] = useState(DUMMY);
  const [reset, setReset] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [isStart, setIsStart] = useState(false);

  // const { startContainer } = useSpring(() => ({
  //   startContainer: isStart ? "display: none" : "display: block",
  // }));

  const spr = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

  const handleRoll = () => {
    const newData = datas.map((data) =>
      data.isHold
        ? data
        : { ...data, diceNum: Math.floor(Math.random() * 6 + 1) }
    );
    setGlitch(true);
    setDatas(newData);
  };

  const handleHoldDice = (id) => {
    const holdData = datas.map((data) =>
      data.id === id ? { ...data, isHold: !data.isHold } : data
    );
    setDatas(holdData);
  };

  const handleReset = () => {
    setReset(false);
    setDatas(DUMMY);
  };

  useEffect(() => {
    const conc1 = datas.every((el) => datas[0].diceNum === el.diceNum);
    const conc2 = datas.every((el) => el.isHold === true);
    // console.log(conc1, conc2);
    if (conc1 && conc2) {
      setReset(true);
    }
  }, [datas]);

  useEffect(() => {
    const timeOut = setTimeout(() => setGlitch(false), 1000);
    console.log("start time out");

    return () => {
      console.log("clean it");
      return clearTimeout(timeOut);
    };
  }, [glitch]);

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
    <div className="app">
      {!isStart && (
        <div className="game__data">
          <div className="container">
            <h1 className="header">Tenzi</h1>
            <h2 className="subheader">
              Roll untill all dice are the same. Click on each dice to hold it.
              Good Luck!
            </h2>
          </div>
          <button className="rollbtn" onClick={() => setIsStart(true)}>
            Lets Go!!
          </button>
        </div>
      )}
      {isStart && (
        <div className="game__canvas">
          <Canvas
          //  camera={[0, 0, 100]}
          // orthographic
          // camera={{ zoom: 100, position: [0, 0, 100] }}
          >
            <Suspense fallback={null}>
              <Bloom>
                <Boxes
                  datas={datas}
                  handleHoldDice={handleHoldDice}
                  isStart={isStart}
                />

                <Lights />
              </Bloom>
              <OrbitControls />
              {glitch && <CameraShake {...cameraShakeCong} />}
            </Suspense>
          </Canvas>
        </div>
      )}
      {isStart && !reset && (
        <button className="btn rollbtn" onClick={handleRoll}>
          Roll it
        </button>
      )}
      {isStart && reset && (
        <button className="btn rollbtn" onClick={handleReset}>
          Reset it
        </button>
      )}
    </div>
  );
}

export default App;
