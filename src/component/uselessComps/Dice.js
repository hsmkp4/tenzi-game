import React from 'react';

function Dice({ data, func }) {
  const hancleClick = () => {
    func(data.id);
  };
  return (
    <div className={`dice ${data.isHold ? 'hold' : ''}`} onClick={hancleClick}>
      {data.diceNum}
    </div>
  );
}

export default Dice;
