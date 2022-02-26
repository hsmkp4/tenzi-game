import { OrbitControls, softShadows } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import './App.css';
import BasePlane from './component/BasePlane';
import Bloom from './component/Bloom';
import Box from './component/Box';
import Boxes from './component/Boxes';
import Dices from './component/Dices';
import Lights from './component/Lights';
import DUMMY from './data';

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

  // console.log(datas);
  useEffect(() => {
    const conc1 = datas.every((el) => datas[0].diceNum === el.diceNum);
    const conc2 = datas.every((el) => el.isHold === true);
    // console.log(conc1, conc2);
    if (conc1 && conc2) {
      setReset(true);
    }
  }, [datas]);

  // console.log(reset);

  /**
   * three codes
   **/

  const boxPositions = [
    [1, 1, 1],
    [3, 2, 0],
    [0, 2, -1],
    [-2, -1, -4],
    [-3, 2, -2],
    [3, 0, -5],
    [3, -3, -1],
    [-1, -2, 1],
    [-4, -3, -2],
    [0, 0, 0],
  ];

  // const positionLoop = () => {
  //   let positions = [];
  //   for (let i = 0; i < 10; i++) {
  //     const randomPOseBoxX = (Math.random() - 0.5) * 7;
  //     const randomPOseBoxY = (Math.random() - 0.5) * 7;
  //     const randomPOseBoxZ = (Math.random() - 0.5) * 4;
  //     let pose = [randomPOseBoxX, randomPOseBoxY, randomPOseBoxZ];
  //     positions.push(pose);
  //   }
  //   return positions;
  // };
  // console.log(positionLoop());
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
          {/* <Main>
            <Boxes boxPositions={boxPositions} />
            <Lights />
          </Main> */}
          {/* {boxPositions.map((el, ind) => (
            <Box pos={el} key={ind} data={datas[ind]} />
          ))} */}
          {/* <Box /> */}
          {/* <BasePlane /> */}

          <Bloom>
            <Suspense fallback={null}>
              <Boxes datas={datas} />
            </Suspense>
            {/* <ambientLight /> */}
            <Lights />
          </Bloom>
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
