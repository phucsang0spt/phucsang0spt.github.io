import { EntitySuit } from "./EntitySuit";

export class World {
  private entities: EntitySuit[] = [];

  addEntity(entity: EntitySuit) {
    this.entities.push(entity);
    entity.world = this;
    entity.initial();
  }

  removeEntity(entity: EntitySuit) {
    this.entities.splice(this.entities.indexOf(entity), 1);
  }

  update() {
    for (const entity of this.entities) {
      entity.update();
      entity.colliderWith(this.entities);
    }
  }

  draw() {
    ctx.background(41, 41, 41);
    for (const entity of this.entities) {
      entity.draw();
    }
  }
}
