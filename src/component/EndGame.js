function EndGame({ handleReset, playerScore, playerName }) {
  return (
    <div className="endgame">
      <div className="endgame__data">
        <h1>
          Gratz <span>{playerName}</span>, you did it 😍
        </h1>
        <h3>
          you made it in <span>{playerScore}</span> seconds 💪
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
