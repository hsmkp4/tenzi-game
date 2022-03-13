function StartPage({
  setIsStart,
  setPlayerName,
  playerName,
  setGameDiff,
  gameDiff,
  setMuted,
}) {
  const modes = {
    0: "Snail", // static
    1: "Chicken", // slow
    2: "Human", // fast
    3: "Greyhound", // very fast
    4: "Cheetah", // in rush!
  };

  const handleStart = () => {
    setIsStart(true);
    setMuted(false);
  };
  return (
    <div className="game__data">
      <h1 className="header">TENZI</h1>
      <div className="container">
        <h2 className="subheader">
          Be the fastest player to make all numbers show the same number. you
          can click on numbers to prevent change number after roll. Good Luck!
        </h2>
      </div>
      <div className="form__name">
        <input
          type="text"
          id="playerName"
          onChange={(e) => setPlayerName(e.target.value)}
          value={playerName}
          placeholder="nickname"
        />
        <button className="rollbtn" onClick={handleStart}>
          Lets Go!!
        </button>
      </div>
      <div className="game__mode">
        <h3>game mode:</h3>
        <div className="game__diff">
          <div
            onClick={() => setGameDiff(0)}
            className={gameDiff === 0 ? "active" : ""}
          >
            {modes[0]}
          </div>
          <div
            onClick={() => setGameDiff(1)}
            className={gameDiff === 1 ? "active" : ""}
          >
            {modes[1]}
          </div>
          <div
            onClick={() => setGameDiff(2)}
            className={gameDiff === 2 ? "active" : ""}
          >
            {modes[2]}
          </div>
          <div
            onClick={() => setGameDiff(3)}
            className={gameDiff === 3 ? "active" : ""}
          >
            {modes[3]}
          </div>
          <div
            onClick={() => setGameDiff(4)}
            className={gameDiff === 4 ? "active" : ""}
          >
            {modes[4]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
