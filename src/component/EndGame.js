import React from "react";

function EndGame({ handleReset, playerScore, playerName }) {
  return (
    <div className="endgame">
      <div className="endgame__data">
        <h1>Gratz {playerName}, you did it 😍</h1>
        <h3>you make it in {playerScore} seconds 💪</h3>
        <button onClick={handleReset} className=" rollbtn">
          Restart
        </button>
      </div>
      <div className="bacdrop"></div>
    </div>
  );
}

export default EndGame;
