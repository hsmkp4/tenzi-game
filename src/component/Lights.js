import React from 'react';

function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 3, 2]} />
    </>
  );
}

export default Lights;
