export abstract class BaseCollider {
  protected position!: Vector;
  protected master!: EntitySuit;
  private id!: string;
  private alreadyCollideds!: Record<BaseCollider["id"], true>;
  public allowBouncing = true;
  constructor(private debug = false) {
    this.id = `${Math.random()}-${new Date().getTime()}`;
    this.alreadyCollideds = {};
  }

  get Position() {
    return this.position;
  }

  set Master(master: EntitySuit) {
    this.master = master;
    this.position = master.Position.copy();
    this.onSetMaster(master);
  }

  protected abstract onSetMaster(master: EntitySuit): void;

  checkWith(target: BaseCollider) {
    if (this.alreadyCollideds[target.id]) {
      this.master.onCollision(target.master);
    } else {
      const isColli = this.isCollision(target);
      if (isColli) {
        this.commitCollision(target);
      }
    }
  }

  private commitCollision(target: BaseCollider) {
    target.alreadyCollideds[this.id] = true;
    this.alreadyCollideds[target.id] = true;

    if (this.allowBouncing && target.allowBouncing) {
      this.bouncing(target);
    }
    this.master.onCollision(target.master);
  }

  protected abstract isCollision(target: BaseCollider): boolean;
  public abstract bouncing(target: BaseCollider): void;

  resetColliFlag() {
    this.alreadyCollideds = {};
  }

  update() {
    this.position.x = this.master.Position.x;
    this.position.y = this.master.Position.y;
  }

  draw() {
    if (this.debug) {
      this.onDraw();
    }
  }

  onDraw() {}
}
