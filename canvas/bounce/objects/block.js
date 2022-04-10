class Block extends Rectangle {
  onInitial() {
    this.gravity += 0.5;
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
      if (this.y + this.height > target.y) {
        if (this.x + this.width > target.x) {
          // this.vec.x = 0;
          // this.x = target.x - this.width;
          // return;
        }
        this.vec.y = 0;
        this.y = target.y - this.height;
        this.isStand = true;
      }
    }
  }
}
