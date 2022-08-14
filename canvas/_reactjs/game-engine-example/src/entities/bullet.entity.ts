import { Square } from "particles/square.particle";
import {
  AvatarSprite,
  LogicComponent,
  RectEntity,
  Matter,
  ParticleSystem,
  Entity,
  Prefab,
} from "react-simple-game-engine";
import {
  Avatar,
  Configation,
  EntityPrepare,
} from "react-simple-game-engine/lib/export-types";

import { Enemy } from "./enemy.entity";

class DeadEffect extends LogicComponent<ParticleSystem> {
  constructor(player: Bullet) {
    super([
      ParticleSystem,
      {
        particleClass: Square,
        particleOptions: {
          color: [168, 207, 237],
          x: player.position.x,
          y: player.position.y,
          lifetime: 0.15,
          size: 4,
        },
        quantityPerFrame: 2,
        vecWeight: 8,
      },
    ]);
  }
}

export type BulletProps = {
  sprite: Avatar;
};

export class Bullet extends RectEntity<BulletProps> {
  private speed = 0.3;
  protected onPrepare(): EntityPrepare<this> {
    return {
      transform: {
        width: 15,
        height: 15,
      },
      sprite: new LogicComponent([
        AvatarSprite,
        {
          source: this.props.sprite,
        },
      ]),
      enabledGravity: false,
      bodyOptions: {
        isSensor: true,
      },
    };
  }

  onUpdate(): void {
    this.move();
    if (this.position.x + this.width / 2 > Renderer.gameWidth) {
      this.explose();
    }
  }

  explose() {
    const effect = new DeadEffect(this);
    this.terminate({
      effect,
    });
  }

  private move() {
    const newX = this.speed * Renderer.deltaTime;
    Matter.Body.setVelocity(this.body, {
      y: 0,
      x: newX,
    });
  }

  onCollision(target: Entity): void {
    if (target instanceof Enemy) {
      this.explose();
    }
  }
}

export class BulletPrefab extends Prefab<Bullet> {
  constructor(config: Configation<Bullet>) {
    super([Bullet, config]);
  }
}
