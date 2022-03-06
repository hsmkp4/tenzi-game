function StartPage({
  setIsStart,
  setPlayerName,
  playerName,
  setGameDiff,
  gameDiff,
  setMuted,
}) {
  const modes = {
    0: "goo geza",
    1: "goo",
    2: "jineka",
    3: "goomesh",
    4: "verza",
  };
  // const modes = {
  //   0: "Zik",
  //   1: "Michka",
  //   2: "Sika",
  //   3: "Ghashnic",
  //   4: "Tela",
  // };

  const handleStart = () => {
    setIsStart(true);
    setMuted(false);
  };
  return (
    <div className="game__data">
      <div className="container">
        <h1 className="header">Tenzi</h1>
        <h2 className="subheader">
          Roll until all numbers are the same. Click on each number to hold it.
          Good Luck!
        </h2>
      </div>
      <div className="form__name">
        <label htmlFor="playerName">Name</label>
        <input
          type="text"
          id="playerName"
          onChange={(e) => setPlayerName(e.target.value)}
          value={playerName}
          placeholder="Name"
        />
        <button className="rollbtn" onClick={handleStart}>
          Lets Go!!
        </button>
      </div>
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
  );
}

export default StartPage;
