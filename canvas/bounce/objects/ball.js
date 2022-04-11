class Ball extends Circle {
  onInitial() {
    this.gravity += 0.7;
    this.tag = "ball";
    this.color = "#e74c3c";
    this.isStand = false;
  }

  onUpdate() {
    if (this.isStand) {
      this.jump();
    }
    if (this.y > canvas.height) {
      this.world.removeEntity(this);
    }
  }

  jump() {
    this.vec.y += -20;
    this.isStand = false;
  }

  onCollision(target) {
    if (target.tag === "ground") {
      if (
        this.x + this.radius > target.x &&
        this.y < target.y + 10 &&
        this.y + this.radius >= target.y &&
        this.y + this.radius + this.vec.y >= target.y
      ) {
        this.vec.y = 0;
        this.y = target.y - this.radius;
        this.isStand = true;
      }

      if (
        this.y + this.radius > target.y &&
        (this.x < target.x) &
          (this.x + this.radius >= target.x) &
          (this.x + this.radius + this.vec.x >= target.x)
      ) {
        this.vec.x = 0;
        this.x = target.x - this.radius;
      }
    }
  }
}
