import React from 'react';

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={3} />
    </>
  );
}

export default Lights;
