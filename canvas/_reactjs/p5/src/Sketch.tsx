import p5 from "p5";
import { useEffect, useRef } from "react";

type SketchProps = {
  onSetup: () => void;
  onDraw: () => void;
};

export function Sketch({ onSetup, onDraw }: SketchProps) {
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (s: p5) => {
      s.setup = () => {
        s.createCanvas(window.innerWidth, window.innerHeight).parent(
          refContainer.current!
        );
        window.ctx = s;
        onSetup();
      };

      s.draw = () => {
        s.background(0);
        onDraw();
      };
    };

    new p5(sketch);
    // eslint-disable-next-line
  }, []);

  return <div ref={refContainer} />;
}
