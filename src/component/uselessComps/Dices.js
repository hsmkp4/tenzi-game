import React from "react";
import Dice from "./Dice";

function Dices({ datas, func }) {
  return (
    <>
      {datas.map((dat) => {
        return <Dice data={dat} key={dat.id} func={func} />;
      })}
    </>
  );
}

export default Dices;
