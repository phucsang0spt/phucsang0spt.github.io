import {
  AvatarSprite,
  LogicComponent,
  RectEntity,
  Matter,
  Prefab,
} from "react-simple-game-engine";

import {
  Avatar,
  Configation,
  EntityPrepare,
} from "react-simple-game-engine/lib/export-types";

export type MoneyItemProps = {
  sprite: Avatar;
};

export class MoneyItem extends RectEntity<MoneyItemProps> {
  private speed = -0.3;
  public value = 10;
  protected onPrepare(): EntityPrepare<this> {
    return {
      transform: {
        width: 45,
        height: 27,
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
    if (this.position.x - this.width / 2 < 0) {
      this.terminate();
    }
  }
  private move() {
    const newX = this.speed * Renderer.deltaTime;
    Matter.Body.setVelocity(this.body, {
      y: 0,
      x: newX,
    });
  }
}

export class MoneyItemPrefab extends Prefab<MoneyItem> {
  constructor(config: Configation<MoneyItem>) {
    super([MoneyItem, config]);
  }
}
