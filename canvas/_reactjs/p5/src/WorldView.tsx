import { useMemo } from "react";
import { Sketch } from "./Sketch";

import { Scene1 } from "./scenes/sc1.scene";

export function WorldView() {
  const scene = useMemo(() => {
    return new Scene1();
  }, []);

  const setup = function () {
    scene.bootstrap();
  };

  const draw = function () {
    scene.action();
  };

  return <Sketch onSetup={setup} onDraw={draw} />;
}
