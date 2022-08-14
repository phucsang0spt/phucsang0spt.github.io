import { Body } from "matter-js";
import {
  AvatarSprite,
  Entity,
  LogicComponent,
  RectEntity,
  Sound,
} from "react-simple-game-engine";
import {
  EntityPrepare,
  Avatar,
} from "react-simple-game-engine/lib/export-types";

import { BulletPrefab } from "./bullet.entity";
import { Manager } from "./manager.entity";
import { MoneyItem } from "./money-item.entity";

type PlayerProps = {
  shootSound: Sound;
  pickItemSound: Sound;
  playerSprite: Avatar;
  hp: number;
  money: number;
};

export class Player extends RectEntity<PlayerProps> {
  private speed = 0.4;
  private currentHp!: number;
  private bulletsPerSecond: number = 2.5;

  set income(_income: number) {
    this.props.money += _income;
    this.scene.emitEntityPropsChange("player-money", this.props.money);
  }

  protected onPrepare(): EntityPrepare<this> {
    this.currentHp = this.props.hp;
    return {
      name: "player",
      transform: {
        x: 15 + 40 / 2,
        y: Renderer.gameHeight / 2,
        width: 42,
        height: 42,
      },
      sprite: new LogicComponent([
        AvatarSprite,
        {
          source: this.props.playerSprite,
        },
      ]),
      bodyOptions: {
        isStatic: true,
      },
    };
  }

  getDamage(hp: number) {
    this.currentHp -= hp;
    if (this.currentHp < 0) {
      this.currentHp = 0;
    }
    this.scene.emitEntityPropsChange("player-health", this.currentHp);
  }

  private move(dir: 1 | -1) {
    let newY = this.body.position.y + this.speed * dir * Renderer.deltaTime;
    newY = Renderer.constrain(
      newY,
      0 + this.height / 2,
      Renderer.gameHeight - this.height / 2
    );

    Body.setPosition(this.body, {
      x: this.body.position.x,
      y: newY,
    });
  }

  private movement() {
    if (Renderer.keyIsPressed) {
      if (Renderer.keyCode === Renderer.UP_ARROW) {
        this.move(-1);
      } else if (Renderer.keyCode === Renderer.DOWN_ARROW) {
        this.move(1);
      }
    }

    if (Renderer.mouseIsPressed) {
      if (Renderer.gameMouseY > this.position.y) {
        this.move(1);
      }
      if (Renderer.gameMouseY < this.position.y) {
        this.move(-1);
      }
    }
  }

  private die() {
    const manager = this.worldManagement.getEntity<Manager>("manager");
    manager.lose();
  }

  private shoot() {
    this.props.shootSound.playNow();
    const bullet = this.scene.getPrefab(BulletPrefab).output({
      transform: {
        x: this.position.x,
        y: this.position.y,
      },
    });
    this.addChild(bullet);
  }

  onActive(): void {
    this.onTimer(
      1 / this.bulletsPerSecond,
      () => {
        this.shoot();
      },
      true
    );
  }

  onCollision(target: Entity): void {
    if (target instanceof MoneyItem) {
      this.income = target.value;

      this.props.pickItemSound.play();
      target.terminate();
    }
  }

  onUpdate(): void {
    if (this.currentHp <= 0) {
      this.die();
    }

    this.movement();
  }
}
