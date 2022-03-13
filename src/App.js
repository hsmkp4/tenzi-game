import { useEffect, useRef, useState } from "react";
import "./App.css";
import DUMMY from "./data";
import StartPage from "./component/StartPage";
import EndGame from "./component/EndGame";
import * as audio from "./audio";
import MyCanvas from "./component/MyCanvas";
import GameInterface from "./component/GameInterface";
import { useThree } from "@react-three/fiber";

function App() {
  const [datas, setDatas] = useState(DUMMY);
  const [reset, setReset] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [playerName, setPlayerName] = useState(() => {
    let user = window.localStorage.getItem("name");
    let initVal = JSON.parse(user);
    if (!user) {
      initVal = "";
    }
    return initVal;
  });
  const [playerScore, setPlayerScore] = useState(0.0);
  const [gameDiff, setGameDiff] = useState(2);
  const [loaderState, setLoaderState] = useState(false);
  const [muted, setMuted] = useState(true);
  const [theme, setTheme] = useState("blue");
  const seconds = useRef();

  const handleRoll = () => {
    const newData = datas.map((data) =>
      data.isHold
        ? data
        : { ...data, diceNum: Math.floor(Math.random() * 6 + 1) }
    );
    setGlitch(true);
    audio.roolMusic2.play();
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

  useEffect(() => {
    if (isStart) {
      window.localStorage.setItem("name", JSON.stringify(playerName));
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
      audio.bgMusic.play();
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
          theme={theme}
          setTheme={setTheme}
        />
      )}
      {isStart && (
        <div className="game__canvas">
          <MyCanvas
            gameDiff={gameDiff}
            glitch={glitch}
            datas={datas}
            handleHoldDice={handleHoldDice}
            isStart={isStart}
            reset={reset}
            setLoaderState={setLoaderState}
            theme={theme}
          />
          <GameInterface
            seconds={seconds}
            reset={reset}
            isStart={isStart}
            handleRoll={handleRoll}
            handleRemake={handleRemake}
            setMuted={setMuted}
            muted={muted}
            theme={theme}
          />
        </div>
      )}

      {isStart && reset && (
        <EndGame
          handleReset={handleReset}
          playerScore={playerScore}
          playerName={playerName}
          gameDiff={gameDiff}
          theme={theme}
        />
      )}
    </div>
  );
}

export default App;
