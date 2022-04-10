class Ball extends Circle {
  onInitial() {
    this.gravity += 0.7;
    this.tag = "ball";
    this.color = "#e74c3c";
    this.isStand = false;

    setInterval(() => {
      if (this.isStand) {
        this.jump();
      }
    }, 500);
  }

  jump() {
    this.vec.y += -20;
    this.isStand = false;
  }

  onCollision(target) {
    if (target.tag === "ground") {
      if (this.y + this.radius > target.y) {
        this.vec.y = 0;
        this.y = target.y - this.radius;
        this.isStand = true;
      }
    }
  }
}
