import { EntitySuit } from "./EntitySuit";

export abstract class RectEntity extends EntitySuit {
  public color!: Color;
  public width!: number;
  public height!: number;
  constructor() {
    super();
    this.color = [1, 1, 1];
    this.width = 0;
    this.height = 0;
  }

  onDraw() {
    ctx.noStroke();
    ctx.fill(...this.color);
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
  }
}
