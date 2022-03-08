import {
  CameraShake,
  // Loader,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import Bloom from "./component/Bloom";
import Boxes from "./component/Boxes";
import Lights from "./component/Lights";
import DUMMY from "./data";
import { useSpring, a } from "@react-spring/three";
import StartPage from "./component/StartPage";
import Main from "./component/Main";
import Particles from "./component/Particles";
import EndGame from "./component/EndGame";
import * as audio from "./audio";
import Loader from "./component/Loader";

function App() {
  const [datas, setDatas] = useState(DUMMY);
  const [reset, setReset] = useState(false);
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
  const [gameDiff, setGameDiff] = useState(2);
  const [loaderState, setLoaderState] = useState(false);
  // console.log(gameDiff);
  // 0 = ea pa -1 = easy -2 = normal-3 = hard -4 = crazy
  const [muted, setMuted] = useState(true);
  const seconds = useRef();

  const handleRoll = () => {
    const newData = datas.map((data) =>
      data.isHold
        ? data
        : { ...data, diceNum: Math.floor(Math.random() * 6 + 1) }
    );
    setGlitch(true);
    audio.roolMusic.play();
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
  const handleRemake = () => {
    setIsStart(false);
    setDatas(DUMMY);
  };

  useEffect(() => {
    const conc1 = datas.every((el) => datas[0].diceNum === el.diceNum);
    const conc2 = datas.every((el) => el.isHold === true);
    if (conc1 && conc2) {
      setReset(true);
    }
  }, [datas]);

  useEffect(() => {
    const timeOut = setTimeout(() => setGlitch(false), 500);
    return () => {
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
    }
  }, [isStart]);

  useEffect(() => {
    if (isStart && !reset && loaderState) {
      const time = Date.now();
      const interval = setInterval(
        () =>
          (seconds.current.innerText = ((Date.now() - time) / 1000).toFixed(1)),
        100
      );

      return () => clearInterval(interval);
    }
  }, [isStart, reset, loaderState]);

  useEffect(() => {
    if (reset) {
      setPlayerScore(seconds.current.innerText);
    }
  }, [reset]);

  useEffect(() => {
    if (isStart && !reset && !muted) {
      // audio.bgMusic.play();
    }
    if (isStart && !reset && muted) {
      audio.bgMusic.pause();
    }
    if (reset) {
      audio.bgMusic.pause();
    }
    if (!isStart) {
      audio.bgMusic.load();
    }
  }, [isStart, muted, reset]);

  // console.log(muted);

  console.log(loaderState);
  return (
    <div className="app">
      {!isStart && (
        <StartPage
          setIsStart={setIsStart}
          setPlayerName={setPlayerName}
          playerName={playerName}
          setGameDiff={setGameDiff}
          gameDiff={gameDiff}
          setMuted={setMuted}
        />
      )}
      {isStart && (
        <div className="game__canvas">
          <h1 ref={seconds} className={`game__point ${reset ? "hide" : ""}`}>
            0.0
          </h1>

          <Canvas dpr={[1, 2]}>
            <Main>
              <Particles gameDiff={gameDiff} />
            </Main>
            <PerspectiveCamera
              position={reset ? [0, 6, 0] : [0, 0, 8]}
              fov={100}
              makeDefault={true}
            />
            <Suspense
              fallback={
                // <Loader />
                null
              }
            >
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
          {/* <Loader
            // dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`}
            initialState={(active) =>
              // active ? setLoaderState(true) : setLoaderState(false)
              console.log(active)
            }
          /> */}
        </div>
      )}
      {isStart && !reset && (
        <div>
          <button className="btn rollbtn" onClick={handleRoll}>
            Roll it
          </button>
          <button className="remake" onClick={handleRemake}>
            Remake
          </button>
          <button className="mute" onClick={() => setMuted((prv) => !prv)}>
            {muted ? "unmute" : "mute"}
          </button>
        </div>
      )}

      {isStart && reset && (
        <EndGame
          handleReset={handleReset}
          playerScore={playerScore}
          playerName={playerName}
          gameDiff={gameDiff}
        />
      )}
    </div>
  );
}

export default App;
