import { Scene } from "../classes/Scene";
import { BoxCollider } from "../colliders/box.collider";
import { Ball } from "../entities/ball.entity";
import { Block } from "../entities/block.entity";
import { Ground } from "../entities/ground.entity";

export class Scene1 extends Scene {
  getActors(): Actor<any>[] {
    return [
      new Ground(),
      new Ball(),
      [
        new Block(),
        function (entity) {
          entity.Position.x = 60 + 10;
          entity.color = [0, 100, 0];
          entity.gravity = 0;
        },
      ] as Actor<Block>,
      [
        new Block(),
        function (entity) {
          entity.Position.x = 200;
          entity.color = [0, 200, 100];
          entity.Collider = new BoxCollider();
          entity.canMove = false;
        },
      ] as Actor<Block>,
    ];
  }
}
