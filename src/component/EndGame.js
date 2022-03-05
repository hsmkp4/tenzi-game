import React from "react";

function EndGame({ handleReset, playerScore, playerName }) {
  return (
    <div className="endgame">
      <div className="endgame__data">
        <h1>
          Gratz <span>{playerName.trim > 0 ? playerName : "dude"}</span>, you
          did it 😍
        </h1>
        <h3>
          you make it in <span>{playerScore}</span> seconds 💪
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
