import {
  ColorSprite,
  LogicComponent,
  RectEntity,
} from "react-simple-game-engine";

import { EntityPrepare } from "react-simple-game-engine/lib/export-types";

import { Enemy, EnemyPrefab, EnemyProps } from "./enemy.entity";
import { Manager } from "./manager.entity";

type EnemySpawnerProps = {
  enemyPerSeconds: number;
  waveDuration: number;
  waves: {
    amountEnemies: number;
  }[];
};
export class EnemySpawner extends RectEntity<EnemyProps & EnemySpawnerProps> {
  static EnemySize = {
    width: 32,
    height: 35,
  };

  waveNumber = 0;

  private get totalEnemies() {
    return this.props.waves.reduce((s, wave) => {
      return s + wave.amountEnemies;
    }, 0);
  }

  protected onPrepare(): EntityPrepare<this> {
    return {
      transform: {
        x: Renderer.width / 2,
        y: Renderer.height / 2,
        width: 10,
        height: 10,
      },
      sprite: new LogicComponent([
        ColorSprite,
        {
          source: [0, 0, 0, 0],
        },
      ]),
      bodyOptions: {
        isSensor: true,
        isStatic: true,
      },
    };
  }

  private generateSpawnPositions() {
    const zoneTop = EnemySpawner.EnemySize.height / 2 + 20;
    const length = Renderer.height - zoneTop * 2;

    const amount = Math.floor(length / EnemySpawner.EnemySize.height);
    const redundantSpacing =
      (length - amount * EnemySpawner.EnemySize.height) / (amount - 1);

    const spawnPositions = Array.from({
      length: amount,
    }).map((_, i) => {
      return {
        x: Renderer.width - EnemySpawner.EnemySize.width / 2,
        y:
          zoneTop +
          EnemySpawner.EnemySize.height / 2 +
          i * (EnemySpawner.EnemySize.height + redundantSpacing),
      };
    });

    return spawnPositions;
  }

  private spawn(positions: { x: number; y: number }[]) {
    const waveNumber = this.waveNumber;
    this.scene.emitEntityPropsChange("wave-number", waveNumber);
    const { amountEnemies } = this.props.waves[waveNumber - 1];
    new EnemiesWave(
      this,
      this.scene.getPrefab(EnemyPrefab),
      amountEnemies,
      1 / this.props.enemyPerSeconds,
      positions,
      () => {
        this.props.waves[waveNumber - 1].amountEnemies--;
        this.scene.emitEntityPropsChange("total-enemies", this.totalEnemies);
      }
    );
  }

  private win() {
    const manager = this.worldManagement.getEntity<Manager>("manager");
    manager.win();
  }

  private hasEnemy() {
    return this.children.some((child) => child instanceof Enemy);
  }

  onUpdate(): void {
    if (this.totalEnemies <= 0) {
      if (!this.hasEnemy()) {
        setTimeout(() => {
          this.win();
        }, 1000);
      }
    }
  }

  onActive(): void {
    const positions = this.generateSpawnPositions();
    const clearTimer = this.onTimer(
      this.props.waveDuration,
      () => {
        if (this.waveNumber++ >= this.props.waves.length) {
          clearTimer();
          return;
        }
        this.spawn(positions);
      },
      true
    );
  }
}

class EnemiesWave {
  constructor(
    spawner: EnemySpawner,
    enemyPrefab: EnemyPrefab,
    amount: number,
    interval: number,
    availableSlots: { x: number; y: number }[],
    onSpawn: () => void
  ) {
    const clearTimer = spawner.onTimer(
      interval,
      () => {
        if (amount-- > 0) {
          const position = Renderer.random(availableSlots);
          const enemy = enemyPrefab.output({
            transform: {
              ...position,
              ...EnemySpawner.EnemySize,
            },
          });
          spawner.addChild(enemy);
          onSpawn();
        } else {
          clearTimer();
        }
      },
      true
    );
  }
}
