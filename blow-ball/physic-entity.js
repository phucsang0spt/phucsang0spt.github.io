class PhysicEntity {
  static makeVector(x = 0, y = 0) {
    const obj = Object.create(null);
    obj.x = x;
    obj.y = y;

    return obj;
  }

  static G = 0.3;

  vel = PhysicEntity.makeVector();
  acc = PhysicEntity.makeVector();

  set x(_x) {
    this._x = _x;
  }
  get x() {
    return this._x;
  }

  set y(_y) {
    this._y = _y;
  }
  get y() {
    return this._y;
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
  }

  clearAccelerator() {
    this.acc = PhysicEntity.makeVector();
  }

  onLoop() {}

  loop() {
    this.prevX = this.x;
    this.prevY = this.y;

    this.effectGravity();

    // set accelerator to velocity
    this.vel.x = this.acc.x;
    this.vel.y = this.acc.y;

    // move by velocity
    this.x += this.vel.x;
    this.y += this.vel.y;

    this.onLoop();
  }

  addForce(fX, fY = 0) {
    this.acc.x += fX;
    this.acc.y += fY;
  }

  effectGravity() {
    this.acc.y += PhysicEntity.G;
  }
}
