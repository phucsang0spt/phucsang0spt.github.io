import { EntitySuit } from "../classes/EntitySuit";
import { RectEntity } from "../classes/RectEntity";
import { BoxCollider } from "../colliders/box.collider";
import { Tag } from "../decorators/tag.decor";

@Tag("block")
export class Block extends RectEntity {
  canMove = true;

  private horMove = false;
  private isJumped = false;
  onInitial(): void {
    this.width = 50;
    this.height = 50;
    this.Collider = new BoxCollider();
    this.mass = 0.05;
  }

  onUpdate(): void {
    if (this.canMove) {
      this.isJumped = false;
      this.horMove = false;
      if (ctx.keyIsDown(ctx.RIGHT_ARROW)) {
        this.addLinearForce({ x: 4 });
        this.horMove = true;
      } else if (ctx.keyIsDown(ctx.LEFT_ARROW)) {
        this.addLinearForce({ x: -4 });
        this.horMove = true;
      } else {
        if (!this.horMove) {
          setTimeout(() => {
            this.V.x = 0;
          }, 0);
        }
      }
      if (ctx.keyIsDown(ctx.DOWN_ARROW)) {
        this.addLinearForce({ y: 4 });
        this.isJumped = true;
      } else if (ctx.keyIsDown(ctx.UP_ARROW)) {
        this.addLinearForce({ y: -4 });
        this.isJumped = true;
      } else {
        if (!this.isJumped) {
          setTimeout(() => {
            this.V.y = 0;
          }, 0);
        }
      }
    }
  }

  onCollision(target: EntitySuit): void {
    if (target.tag === "ground") {
      this.isJumped = false;
    }
  }
}
