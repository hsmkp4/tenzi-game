import { OrbitControls, softShadows } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import BasePlane from "./component/BasePlane";
import Bloom from "./component/Bloom";
import Box from "./component/Box";
import Boxes from "./component/Boxes";
import Dices from "./component/Dices";
import Lights from "./component/Lights";
import DUMMY from "./data";

softShadows();

function App() {
  const [datas, setDatas] = useState(DUMMY);
  const [reset, setReset] = useState(false);

  const handleRoll = () => {
    const newData = datas.map((data) =>
      data.isHold
        ? data
        : { ...data, diceNum: Math.floor(Math.random() * 6 + 1) }
    );
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

  console.log(datas);

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
          <Bloom>
            <Suspense fallback={null}>
              <Boxes datas={datas} handleHoldDice={handleHoldDice} />
            </Suspense>
            <Lights />
          </Bloom>
          <OrbitControls />
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
