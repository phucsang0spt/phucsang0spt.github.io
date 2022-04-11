class Block extends Rectangle {
  onInitial() {
    this.gravity += 0.4;
    this.tag = "block";
    this.color = "#3498db";
    this.isStand = false;

    setInterval(() => {
      if (this.isStand) {
        this.jump();
      }
    }, 500);
  }

  jump() {
    this.vec.y += -15;
    this.isStand = false;
  }

  onCollision(target) {
    if (target.tag === "ground") {
      if (
        this.x + this.width > target.x &&
        (this.y < target.y) &
          (this.y + this.height >= target.y) &
          (this.y + this.height + this.vec.y >= target.y)
      ) {
        this.vec.y = 0;
        this.y = target.y - this.height;
        this.isStand = true;
      }
      if (
        this.y + this.height > target.y &&
        (this.x < target.x) &
          (this.x + this.width >= target.x) &
          (this.x + this.width + this.vec.x >= target.x)
      ) {
        this.vec.x = 0;
        this.x = target.x - this.width;
      }
    }
  }
}
