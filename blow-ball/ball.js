class Ball extends BoardEntity {
  constructor(x = 0, y = 0, color, size) {
    super("comp-ball", x, y, size, size);

    this.radius = size / 2;
    this.sqrRadius = Math.pow(this.radius, 2);
    this.body.style.setProperty("--color", color);
  }

  destroy() {
    super.destroy();
    const index = board.balls.findIndex((ball) => ball === this);
    board.balls.splice(index, 1);
  }

  onUpdate() {
    const ground = board.ground;
    if (this.isTouchedGround(ground)) {
      this.bounceByGround(ground);
    }
  }

  isWrappedPoint(point) {
    const sqrDistance =
      Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2);
    return sqrDistance <= this.sqrRadius;
  }

  isTouchedGround(ground) {
    const gRect = ground.rect;
    const closePoint = PhysicEntity.makeVector(
      clamp(this.x, gRect.left, gRect.right),
      clamp(this.y, gRect.top, gRect.bottom)
    );
    return this.isWrappedPoint(closePoint);
  }

  bounceByGround(ground) {
    const gRect = ground.rect;
    const willPushX =
      this.vel.x > 0
        ? this.prevX + this.radius < gRect.left
        : this.vel.x < 0
        ? this.prevX - this.radius > gRect.right
        : false;

    const willPushY =
      this.vel.y > 0
        ? this.prevY + this.radius < gRect.top
        : this.vel.y < 0
        ? this.prevY - this.radius > gRect.bottom
        : false;

    // console.log({
    //   check: this.vel.y > 0,
    //   py: this.prevY,
    //   pyr: this.prevY + this.radius,
    //   gTop: gRect.topLeft.y,
    //   y: this.y,
    //   willPushY,
    // });

    if (willPushX) {
      if (this.vel.x > 0) {
        this.x = gRect.left - this.radius - 0.1;
      } else {
        this.x = gRect.right + this.radius + 0.1;
      }
    }

    if (willPushY) {
      if (this.vel.y > 0) {
        this.y = gRect.top - this.radius - 0.1;
        this.addForce(0, -this.acc.y * 1.5);
      } else {
        // will not happen now
        this.y = gRect.bottom + this.radius + 0.1;
        this.addForce(0, -this.acc.y * 1.5);
      }
    }
  }
}
