class Rectangle {
  constructor(x, y, width, height, vec = { x: 0, y: 0 }) {
    this.id = `${Math.random()}-${new Date().getTime()}`;
    this.type = "rect";
    this.tag = "rect";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "#fff";
    this.vec = vec;
    this.gravity = 0;
    this.lastCollTargets = {};
  }

  initial() {
    this.onInitial();
  }
  onInitial() {}

  onBind(funcBind) {
    funcBind(this);
    return this;
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  setX(x) {
    this.x = x;
    return this;
  }

  setY(y) {
    this.y = y;
    return this;
  }

  update() {
    this.x += this.vec.x;
    this.y += this.vec.y;
    this.vec.y += this.gravity;

    this.onUpdate();
  }
  onUpdate() {}

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.onDraw();
  }
  onDraw() {}

  checkCollision(target) {
    if (this.lastCollTargets[target.id]) {
      this.onCollision(target);
    } else {
      this.onCheckCollision(target);
    }
  }

  onCheckCollision(target) {
    if (target.type === "circle") {
      if (
        this.x + this.width >= target.x - target.radius &&
        this.x <= target.x + target.radius &&
        this.y + this.height >= target.y - target.radius &&
        this.y <= target.y + target.radius
      ) {
        this.commitCollision(target);
      }
      return;
    }
    if (target.type === "rect") {
      if (
        this.x + this.width >= target.x &&
        this.x <= target.x + target.width &&
        this.y + this.height >= target.y &&
        this.y <= target.y + target.height
      ) {
        this.commitCollision(target);
      }
      return;
    }
  }

  commitCollision(target) {
    target.lastCollTargets[this.id] = true;
    this.lastCollTargets[target.id] = true;
    this.onCollision(target);
  }

  onCollision(target) {}
}

class Circle extends Rectangle {
  constructor(x, y, radius, vec = { x: 0, y: 0 }) {
    super(x, y, radius * 2, radius * 2, vec);
    this.radius = radius;
    this.type = "circle";
    this.tag = "circle";
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    this.onDraw();
  }

  onCheckCollision(target) {
    if (target.type === "circle") {
      // if (
      //   this.x + this.width >= target.x - target.radius &&
      //   this.x <= target.x + target.radius &&
      //   this.y + this.height >= target.y - target.radius &&
      //   this.y <= target.y + target.radius
      // ) {
      //   this.commitCollision(target);
      // }
      return;
    }
    if (target.type === "rect") {
      if (
        this.x + this.radius >= target.x &&
        this.x - this.radius <= target.x + target.width &&
        this.y + this.radius >= target.y &&
        this.y - this.radius <= target.y + target.height
      ) {
        this.commitCollision(target);
      }
      return;
    }
  }
}
