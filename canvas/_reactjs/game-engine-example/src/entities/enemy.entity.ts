import {
  AvatarSprite,
  Entity,
  LogicComponent,
  ParticleSystem,
  RectEntity,
  Prefab,
  Matter,
  Sound,
} from "react-simple-game-engine";

import {
  EntityPrepare,
  Collection,
  Configation,
} from "react-simple-game-engine/lib/export-types";

import { Square } from "particles/square.particle";
import { EnemyLevel } from "configs/enemy.configs";

import { Player } from "./player.entity";
import { MoneyItemPrefab } from "./money-item.entity";
import { Bullet } from "./bullet.entity";

class DeadEffect extends LogicComponent<ParticleSystem> {
  constructor(enemy: Enemy) {
    super([
      ParticleSystem,
      {
        particleClass: Square,
        particleOptions: {
          color: enemy.level.color,
          x: enemy.position.x,
          y: enemy.position.y,
          lifetime: 0.15,
          size: 7,
        },
        quantityPerFrame: 2,
        vecWeight: 7,
      },
    ]);
  }
}

export type EnemyProps = {
  levels: Collection<EnemyLevel>;
  weights: Collection<number>;
  destroyedSound: Sound;
};

export class Enemy extends RectEntity<EnemyProps> {
  private speed = -0.1;
  public level!: EnemyLevel;
  public hitCount!: number;

  get weight() {
    return this.getProperty<AvatarSprite>("sprite").offset.index + 1;
  }

  set weight(_deltaWeight: number) {
    this.getProperty<AvatarSprite>("sprite").offset.index += _deltaWeight;
  }

  protected onPrepare(): EntityPrepare<this> {
    this.level = Renderer.choose(this.props.levels);
    this.hitCount = this.level.level;
    return {
      sprite: new LogicComponent([
        AvatarSprite,
        {
          source: this.level.sprite,
          offset: {
            width: 32,
            height: 35,
            index: Renderer.choose(this.props.weights) - 1,
          },
        },
      ]),
      enabledGravity: false,
      bodyOptions: {
        isSensor: true,
      },
    };
  }

  private move() {
    const newX = this.speed * Renderer.deltaTime;

    Matter.Body.setVelocity(this.body, {
      y: 0,
      x: newX,
    });
  }

  onUpdate(): void {
    this.move();
    if (this.position.x - this.width / 2 < 0) {
      this.dutyDead(false);
    }
    if (this.weight < 1) {
      this.deadbyKill();
    }
  }

  deadbyKill() {
    this.props.destroyedSound.play();
    const effect = new DeadEffect(this);
    this.terminate({
      effect,
    });
    const moneyItem = this.scene.getPrefab(MoneyItemPrefab).output({
      transform: {
        x: this.position.x,
        y: this.position.y,
      },
    });
    moneyItem.value = 5 * this.level.level;
    this.worldManagement.addEntity(moneyItem);
  }

  dutyDead(byHitPlayer: boolean) {
    const player = this.worldManagement.getEntity<Player>("player");
    if (byHitPlayer) {
      player.getDamage(2 * this.weight);
    } else {
      player.getDamage(this.weight);
    }
    const effect = new DeadEffect(this);
    this.terminate({
      effect,
    });
  }

  getShoot() {
    const income = 10 * this.level.level;
    const player = this.worldManagement.getEntity<Player>("player");

    this.hitCount--;
    if (this.hitCount === 0) {
      player.income = income + income * 0.5;
      this.hitCount = this.level.level;
      this.weight = -1;
    } else {
      player.income = income;
    }
  }

  onCollision(target: Entity): void {
    if (target instanceof Player) {
      this.dutyDead(true);
    } else if (target instanceof Bullet) {
      this.getShoot();
    }
  }
}

export class EnemyPrefab extends Prefab<Enemy> {
  constructor(config: Configation<Enemy>) {
    super([Enemy, config]);
  }
}
