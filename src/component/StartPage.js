import React, { useEffect } from "react";

function StartPage({ setIsStart, setPlayerName, playerName }) {
  return (
    <div className="game__data">
      <div className="container">
        <h1 className="header">Tenzi</h1>
        <h2 className="subheader">
          Roll untill all dice are the same. Click on each dice to hold it. Good
          Luck!
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
        <button className="rollbtn" onClick={() => setIsStart(true)}>
          Lets Go!!
        </button>
      </div>
    </div>
  );
}

export default StartPage;
