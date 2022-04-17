import { CircleEntity } from "../classes/CircleEntity";
import { RectEntity } from "../classes/RectEntity";
import { BaseCollider } from "./base.collider";

export class CircleCollider extends BaseCollider {
  public radius!: number;

  onSetMaster(master: EntitySuit): void {
    if (master instanceof RectEntity) {
      this.radius = master.width;
    } else if (master instanceof CircleEntity) {
      this.radius = master.radius;
    }
  }

  isCollision(target: BaseCollider) {
    return false;
  }

  bouncing() {}

  onDraw(): void {
    ctx.fill(1, 1, 1, 0);
    ctx.stroke(46, 204, 113);
    ctx.strokeWeight(1);
    ctx.circle(this.position.x, this.position.y, 2 * this.radius);
  }
}
