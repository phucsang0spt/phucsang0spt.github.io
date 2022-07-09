import { Particle } from "react-simple-game-engine/lib";

export class Square extends Particle {
  onDraw(): void {
    Renderer.rect(0, 0, this.size, this.size);
  }
}
