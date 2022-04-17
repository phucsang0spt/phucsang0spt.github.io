import { CircleEntity } from "../classes/CircleEntity";
import { CircleCollider } from "../colliders/circle.collider";
import { Tag } from "../decorators/tag.decor";

@Tag("ball")
export class Ball extends CircleEntity {
  onInitial(): void {
    this.radius = 25;
    this.color = [110, 100, 10];
    this.mass = 0;
    this.Position.x = 160 + 10;
    this.Position.y = 100;
    this.Collider = new CircleCollider(true);
  }
}
