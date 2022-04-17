import { BaseCollider } from "../colliders/base.collider";
import { World } from "./World";

const G = 9.83;

export abstract class EntitySuit {
  private v!: Vector;
  protected id!: string;
  public readonly tag!: string;
  protected position!: Vector;
  protected collider?: BaseCollider;
  public world!: World;
  public mass!: number;
  public gravity!: number;

  constructor() {
    this.id = `${Math.random()}-${new Date().getTime()}`;
    this.v = ctx.createVector(0, 0);
    this.gravity = 1;
    this.mass = 0;
    this.position = ctx.createVector(0, 0);
    this.tag = (this as any).constructor.tag;
  }

  set Collider(collider: BaseCollider) {
    this.collider = collider;
    collider.Master = this;
  }

  get Collider(): BaseCollider {
    return this.collider!;
  }

  get Position() {
    return this.position;
  }

  get V() {
    return this.v;
  }

  addForce(acc: Vector | { x?: number; y?: number }) {
    const { x = 0, y = 0 } = acc;
    this.v.x += x;
    this.v.y += y;
  }

  addLinearForce(acc: Vector | { x?: number; y?: number }) {
    if (acc.x != null && acc.y == null) {
      this.v.x = acc.x;
    } else if (acc.x == null && acc.y != null) {
      this.v.y = acc.y;
    } else if (acc.x != null && acc.y != null) {
      this.v.x = acc.x;
      this.v.y = acc.y;
    } else {
      this.v.x = 0;
      this.v.y = 0;
    }
  }

  initial() {
    console.log(`Initted ${this.tag} entity (id : ${this.id})`);
    this.onInitial();
  }
  onInitial() {}

  onBind(funcBind: (entity: EntitySuit) => EntitySuit) {
    funcBind(this);
    return this;
  }

  update() {
    this.v.add(0, this.gravity * G * this.mass);
    this.position.add(this.v);
    if (this.collider) {
      this.collider.update();
    }
    this.onUpdate();
  }
  onUpdate() {}

  draw() {
    this.onDraw();
    if (this.collider) {
      this.collider.draw();
    }
  }
  onDraw() {}

  colliderWith(targets: EntitySuit[]) {
    if (this.collider) {
      for (const target of targets) {
        if (target !== this) {
          if (target.collider) {
            this.collider.checkWith(target.collider);
          }
        }
      }
      this.collider.resetColliFlag();
    }
  }

  onCollision(target: EntitySuit) {}
}
