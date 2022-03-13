function GameInterface({
  seconds,
  reset,
  isStart,
  handleRoll,
  handleRemake,
  setMuted,
  muted,
}) {
  return (
    <>
      <h1 ref={seconds} className={`game__point ${reset ? "hide" : ""}`}>
        0.0
      </h1>
      {isStart && !reset && (
        <div>
          <button className="btn rollbtn" onClick={handleRoll}>
            Roll it
          </button>
          <button className="remake" onClick={handleRemake}>
            Remake
          </button>
          <button className="mute" onClick={() => setMuted((prv) => !prv)}>
            {muted ? "unmute" : "mute"}
          </button>
        </div>
      )}
    </>
  );
}

export default GameInterface;
