class World {
  entities = [];
  constructor() {}

  addEntity(entity) {
    this.entities.push(entity);
    entity.world = this;
    entity.initial();
  }

  removeEntity(entity) {
    this.entities.splice(this.entities.indexOf(entity), 1);
  }

  update() {
    for (const entity of this.entities) {
      entity.update();
      for (const subEntity of this.entities) {
        if (entity !== subEntity) {
          entity.checkCollision(subEntity);
        }
      }
      entity.lastCollTargets = {};
    }
  }

  draw() {
    ctx.fillStyle = "#292929";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (const entity of this.entities) {
      entity.draw();
    }
  }
}
