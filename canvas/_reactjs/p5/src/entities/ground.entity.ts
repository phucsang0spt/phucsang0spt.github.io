import { RectEntity } from "../classes/RectEntity";
import { BoxCollider } from "../colliders/box.collider";
import { Tag } from "../decorators/tag.decor";

@Tag("ground")
export class Ground extends RectEntity {
  onInitial(): void {
    this.width = ctx.width;
    this.height = 200;
    this.position.x = 60;
    this.position.y = ctx.height - this.height;
    this.color = [0, 0, 0];
    this.Collider = new BoxCollider();
  }
}
