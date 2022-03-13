function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 2, 4]} intensity={2} />
    </>
  );
}

export default Lights;
