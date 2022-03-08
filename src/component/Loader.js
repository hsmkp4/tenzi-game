import { Html, useProgress } from "@react-three/drei";
import React, { useEffect } from "react";

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  //   console.log(progress);
  useEffect(() => {
    console.log(progress, loaded);
  }, [progress]);
  return <Html center>{progress} % loaded</Html>;
}

export default Loader;
