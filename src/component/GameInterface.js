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
  theme,
}) {
  const [isMob, setIsMob] = useState("");
  const handleResize = () => {
    if (window.innerWidth < 760) {
      setIsMob(true);
    } else {
      setIsMob(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <h1 ref={seconds} className={`game__point ${reset ? "hide" : ""}`}>
        0.0
      </h1>
      {isStart && !reset && (
        <div>
          <button
            className={`btn rollbtn ${
              theme === "blue"
                ? "b1"
                : theme === "purple"
                ? "p1"
                : theme === "red"
                ? "r1"
                : ""
            }`}
            onClick={handleRoll}
          >
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
      {!reset &&
        (!isMob ? (
          <div className="screenhelper">
            <p>
              * hold <span>left click</span> and move it to orbit in scene,
            </p>
            <p>
              * you can zoom in and out with <span>scroll wheel,</span>
            </p>
            <p>
              * <span>Right click </span>
              for span.
            </p>
          </div>
        ) : (
          <div className="screenhelper">
            <p>
              * you can <span>rotate</span> in game scene
            </p>
          </div>
        ))}
    </div>
  );
}

export default GameInterface;
