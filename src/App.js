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
import { Color } from "three";
import StartPage from "./component/StartPage";
import Plane from "./component/Plane";
import { Physics } from "@react-three/cannon";
import Main from "./component/Main";
import Box from "./component/Box";
import Particles from "./component/Particles";
import EndGame from "./component/EndGame";

function App() {
  const [datas, setDatas] = useState(DUMMY);
  const [reset, setReset] = useState(false);
  // const [gameIsOver, setGameIsOver] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [playerName, setPlayerName] = useState(() => {
    let user = window.localStorage.getItem("playerName");
    if (!user) {
      user = "";
    }
    return user;
  });
  const [playerScore, setPlayerScore] = useState(0.0);

  const seconds = useRef();

  // const { startContainer } = useSpring(() => ({
  //   startContainer: isStart ? "display: none" : "display: block",
  // }));

  // const spr = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

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
    setIsStart(false);

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
    const timeOut = setTimeout(() => setGlitch(false), 500);
    // console.log("start time out");

    return () => {
      // console.log("clean it");
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

  useEffect(() => {
    if (isStart) {
      window.localStorage.setItem("playerName", playerName);
      // console.log("hey there!");
    }
  }, [isStart]);

  useEffect(() => {
    if (isStart && !reset) {
      const time = Date.now();
      const interval = setInterval(
        () =>
          (seconds.current.innerText = ((Date.now() - time) / 1000).toFixed(1)),
        100
      );

      return () => clearInterval(interval);
    }
  }, [isStart, reset]);

  useEffect(() => {
    if (reset) {
      setPlayerScore(seconds.current.innerText);

      console.log("game is over");
    }
  }, [reset]);

  // console.log(playerScore);
  console.log(reset);

  return (
    <div className="app">
      {!isStart && (
        <StartPage
          setIsStart={setIsStart}
          setPlayerName={setPlayerName}
          playerName={playerName}
        />
      )}
      {isStart && (
        <div className="game__canvas">
          <h1 ref={seconds} className={`game__point ${reset ? "hide" : ""}`}>
            0.0
          </h1>
          <Canvas
            dpr={[1, 2]}
            //  camera={[0, 0, 100]}
            // orthographic
            // camera={{ zoom: 100, position: [0, 0, 100] }}
            // camera={{ fov: 55, near: 0.1, far: 1000, position: [0, 0, 5] }}
          >
            <Main>
              <Particles />
            </Main>
            <PerspectiveCamera
              position={reset ? [0, 6, 0] : [0, 0, 5]}
              fov={70}
              makeDefault={reset}
            />

            <Bloom>
              <Physics>
                <Boxes
                  datas={datas}
                  handleHoldDice={handleHoldDice}
                  isStart={isStart}
                  reset={reset}
                />
              </Physics>
              <Lights />
            </Bloom>
            <OrbitControls />
            {glitch && <CameraShake {...cameraShakeCong} />}
          </Canvas>
        </div>
      )}
      {isStart && !reset && (
        <button className="btn rollbtn" onClick={handleRoll}>
          Roll it
        </button>
      )}
      {isStart && reset && (
        <EndGame
          handleReset={handleReset}
          playerScore={playerScore}
          playerName={playerName}
        />
      )}
      {/* {isStart && reset && (
        <button className="btn rollbtn" onClick={handleReset}>
          Reset it
        </button>
      )} */}
    </div>
  );
}

export default App;
