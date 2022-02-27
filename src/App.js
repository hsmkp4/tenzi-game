import { OrbitControls, softShadows } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Glitch } from "@react-three/postprocessing";
import { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import BasePlane from "./component/BasePlane";
import Bloom from "./component/Bloom";
import Box from "./component/Box";
import Boxes from "./component/Boxes";
import Dices from "./component/Dices";
import Lights from "./component/Lights";
import DUMMY from "./data";
import { GlitchMode } from "postprocessing";

softShadows();

function App() {
  const [datas, setDatas] = useState(DUMMY);
  const [reset, setReset] = useState(false);
  const [glitch, setGlitch] = useState(false);

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
    const timeOut = setTimeout(() => setGlitch(false), 200);

    return () => clearTimeout(timeOut);
  });
  console.log(datas);
  console.log(glitch);
  console.log(GlitchMode);

  return (
    <div className="app">
      {/* <div className="game__data">
        <div className="container">
          <h1 className="header">Tenzi</h1>
          <h2 className="subheader">
            Roll untill all dice are the same. Click on each dice to hold it.
            Good Luck!
          </h2>
        </div>
        <div className="dices">
          {datas && <Dices datas={datas} func={handleHoldDice} />}
        </div>

        {!reset && (
          <button className="rollbtn" onClick={handleRoll}>
            Roll
          </button>
        )}
        {reset && (
          <button className="rollbtn" onClick={handleReset}>
            Reset
          </button>
        )}
      </div> */}
      <div className="game__canvas">
        <Canvas camera={[0, 0, 100]}>
          <Suspense fallback={null}>
            <Bloom>
              <Boxes datas={datas} handleHoldDice={handleHoldDice} />

              <Lights />
            </Bloom>
            <OrbitControls />
            {glitch && (
              <EffectComposer>
                <Glitch
                  delay={[0, 0]}
                  duration={[0.0, 0.4]}
                  // mode={GlitchMode.DISABLED}
                  active
                  strength={[0.1, 0.6]}
                  // ratio={1}
                />
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>
      </div>
      {!reset && (
        <button className="btn rollbtn" onClick={handleRoll}>
          Roll it
        </button>
      )}
      {reset && (
        <button className="btn rollbtn" onClick={handleReset}>
          Reset it
        </button>
      )}
    </div>
  );
}

export default App;
