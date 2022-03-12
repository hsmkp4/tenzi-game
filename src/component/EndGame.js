function EndGame({ handleReset, playerScore, playerName, gameDiff }) {
  const modes = {
    0: "Snail", // static
    1: "Chicken", // slow
    2: "Human", // fast
    3: "Greyhound", // very fast
    4: "Cheetah", // in rush!
  };
  return (
    <div className="endgame">
      <div className="endgame__data">
        <h1>
          Gratz <span>{playerName}</span>, you did it 😎
        </h1>
        <h3>
          you made it in <span>{playerScore}</span> seconds on{" "}
          <span>{modes[gameDiff]}</span> mode 💪
        </h3>
        <button onClick={handleReset} className=" rollbtn">
          Restart
        </button>
      </div>
      <div className="bacdrop"></div>
    </div>
  );
}

export default EndGame;
