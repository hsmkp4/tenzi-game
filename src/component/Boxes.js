import React from 'react';
import Box from './Box';

function Boxes({ datas }) {
  const randomPOseBoxX = (Math.random() - 0.5) * 5;
  const randomPOseBoxY = (Math.random() - 0.5) * 5;
  const randomPOseBoxZ = (Math.random() - 0.5) * 3;
  return (
    <>
      {datas.map((data) => (
        <Box
          pos={[randomPOseBoxX, randomPOseBoxY, randomPOseBoxZ]}
          data={data}
          key={data.id}
        />
      ))}
    </>
  );
}

export default Boxes;
