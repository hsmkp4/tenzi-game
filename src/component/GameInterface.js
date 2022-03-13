import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";

function GameInterface({
  seconds,
  reset,
  isStart,
  handleRoll,
  handleRemake,
  setMuted,
  muted,
}) {
  const [isMob, setIsMob] = useState(true);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 760) {
        setIsMob(true);
      } else {
        setIsMob(false);
      }
    });
  }, []);
  console.log(isMob);
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
      {!isMob ? (
        <div className="screenhelper">
          <p>
            * hold <span>left click</span> and move it to orbit in scene,
          </p>
          <p>
            * you can zoom in and out with <span>scroll wheel,</span>
          </p>
          <p>
            * <span>shift</span> plus <span>left click </span>
            for span.
          </p>
        </div>
      ) : (
        <div className="screenhelper">
          <p>
            * you can <span>rotate</span> in scene
          </p>
        </div>
      )}
    </>
  );
}

export default GameInterface;
