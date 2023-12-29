class BoardEntity extends PhysicEntity {
  static Comp = {};
  body = null;

  _rect = Object.create(null);

  get rect() {
    const left = this.x - this.width / 2;
    const right = this.x + this.width / 2;
    const top = this.y - this.height / 2;
    const bottom = this.y + this.height / 2;

    this._rect.topLeft ??= PhysicEntity.makeVector();
    this._rect.topRight ??= PhysicEntity.makeVector();
    this._rect.bottomLeft ??= PhysicEntity.makeVector();
    this._rect.bottomRight ??= PhysicEntity.makeVector();

    this._rect.topLeft.x = left;
    this._rect.topLeft.y = top;

    this._rect.topRight.x = right;
    this._rect.topRight.y = top;

    this._rect.bottomLeft.x = left;
    this._rect.bottomLeft.y = bottom;

    this._rect.bottomRight.x = right;
    this._rect.bottomRight.y = bottom;

    this._rect.left = left;
    this._rect.top = top;
    this._rect.right = right;
    this._rect.bottom = bottom;

    return this._rect;
  }

  constructor(compId, x, y, width, height) {
    super(x, y);

    BoardEntity.Comp[compId] ??= document.getElementById(compId);
    this.body =
      BoardEntity.Comp[compId].content.firstElementChild.cloneNode(true);

    board.appendChild(this.body);

    this.width = width;
    this.height = height;

    this.drawer = this.body.style.setProperty.bind(this.body.style);

    this.body.classList.add("board-entity");
    this.drawer("--x", this.x);
    this.drawer("--y", this.y);
    this.drawer("--width", width);
    this.drawer("--height", height);
  }

  onUpdate() {}

  onLoop() {
    this.onUpdate();

    // draw
    this.drawer("--x", this.x);
    this.drawer("--y", this.y);
  }

  destroy() {
    board.removeChild(this.body);
  }
}
