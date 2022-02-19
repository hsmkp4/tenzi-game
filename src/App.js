import { useState } from 'react';
import './App.css';
import Dices from './component/Dices';
import DUMMY from './data';

function App() {
  const [datas, setDatas] = useState(DUMMY);
  // console.log(datas);

  const handleRoll = () => {
    const newData = datas.map((data) =>
      data.isHold
        ? data
        : { ...data, diceNum: Math.round(Math.random() * 6 + 1) }
    );
    setDatas(newData);
  };

  const handleHoldDice = (id) => {
    const holdData = datas.map((data) =>
      data.id === id ? { ...data, isHold: !data.isHold } : data
    );
    setDatas(holdData);
  };
  console.log(datas);

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
      <button className="rollbtn" onClick={handleRoll}>
        Roll
      </button>
    </div>
  );
}

export default App;
