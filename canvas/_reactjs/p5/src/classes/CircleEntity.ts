import { EntitySuit } from "./EntitySuit";

export abstract class CircleEntity extends EntitySuit {
  public color!: Color;
  public radius!: number;
  constructor() {
    super();
    this.color = [1, 1, 1];
    this.radius = 0;
  }

  onDraw() {
    ctx.noStroke();
    ctx.fill(...this.color);
    ctx.circle(this.position.x, this.position.y, 2 * this.radius);
  }
}
