import { useEffect, useState } from 'react';
import './App.css';
import Dices from './component/Dices';
import DUMMY from './data';

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

  console.log(datas);
  useEffect(() => {
    const conc1 = datas.every((el) => datas[0].diceNum === el.diceNum);
    const conc2 = datas.every((el) => el.isHold === true);
    // console.log(conc1, conc2);
    if (conc1 && conc2) {
      setReset(true);
    }
  }, [datas]);

  console.log(reset);

  return (
    <div className="app">
      <div className="container">
        <h1 className="header">Tenzi</h1>
        <h2 className="subheader">
          Roll untill all dice are the same. Click on each dice to hold it. Good
          Luck!
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
    </div>
  );
}

export default App;
