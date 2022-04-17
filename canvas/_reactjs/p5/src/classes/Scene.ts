import { World } from "./World";

export abstract class Scene {
  private world!: World;

  abstract getActors(): Actor[];

  bootstrap() {
    this.world = new World();
    const actors = this.getActors();
    for (const actor of actors) {
      const [entity, prepare] = Array.isArray(actor) ? actor : [actor];
      this.world.addEntity(entity);
      prepare?.(entity);
    }
  }

  action() {
    this.world.update();
    this.world.draw();
  }
}
