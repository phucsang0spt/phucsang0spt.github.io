import {
  LogicComponent,
  Saver,
  Scene,
  SoundFrom,
  SpriteFrom,
  SceneTag,
  SceneUI,
  Sound,
} from "react-simple-game-engine";
import {
  type Avatar,
  Collection,
  GetSoundOptions,
} from "react-simple-game-engine/lib/export-types";
import { SoundType } from "react-simple-game-engine/lib/export-enums";

import { Player } from "entities/player.entity";
import { Background } from "entities/background.entity";
import { EnemySpawner } from "entities/enemy-spawner.entity";
import { BulletPrefab } from "entities/bullet.entity";
import { EnemyPrefab } from "entities/enemy.entity";
import { MoneyItemPrefab } from "entities/money-item.entity";
import { Manager } from "entities/manager.entity";

import background from "assets/images/background.jpg";
import player from "assets/images/player.png";
import bullet from "assets/images/bullet.png";
import money from "assets/images/money.png";

import winSound from "assets/sounds/win.wav";
import loseSound from "assets/sounds/lose.wav";
import shootSound from "assets/sounds/shoot.wav";
import pickItemSound from "assets/sounds/pick-item.wav";
import enemyDestroyedSound from "assets/sounds/enemy-destroyed.wav";
import backgroundMusic from "assets/sounds/background.wav";

import { createEnemyLevels, EnemyLevel } from "configs/enemy.configs";

import { GamePlayUI } from "./game-play.ui.scene";

@SceneTag("scene-1")
@SceneUI(GamePlayUI)
export class Scene1 extends Scene {
  @SpriteFrom(background)
  backgroundSprite!: Avatar;

  @SpriteFrom(money)
  moneySprite!: Avatar;

  @SpriteFrom(bullet)
  bulletSprite!: Avatar;

  @SpriteFrom(player)
  playerSprite!: Avatar;

  @SoundFrom(enemyDestroyedSound)
  enemyDestroyedSound!: Sound;

  @SoundFrom(pickItemSound)
  pickItemSound!: Sound;

  @SoundFrom(shootSound)
  shootSound!: Sound;

  @SoundFrom(loseSound)
  loseSound!: Sound;

  @SoundFrom(winSound)
  winSound!: Sound;

  @SoundFrom({ src: backgroundMusic, volumn: 0.4 }, SoundType.BACKGROUND)
  backgroundMusic!: Sound;

  playerHP: number = 50;
  playerMoney: number = 50;

  enemyLevels!: Collection<EnemyLevel>;
  enemyWeights!: Collection<number>;

  async onLoadAssets() {
    this.enemyLevels = await createEnemyLevels(this, [[1, 0.6], [2]]);
    this.enemyWeights = [[1, 0.4], [2, 0.3], [3, 0.2], [4]];
  }

  protected getSoundOptions(): GetSoundOptions {
    return {
      [SoundType.ONCE]: {
        canPlay: Saver.get("sound", Boolean),
      },
    };
  }
  protected getUIProps() {
    return {
      playerHP: this.playerHP,
      playerMoney: this.playerMoney,
      totalEnemies: 5 + 8,
    };
  }

  getComponents() {
    return [
      new LogicComponent([
        Manager,
        {
          props: {
            backgroundMusic: this.backgroundMusic,
            loseSound: this.loseSound,
            winSound: this.winSound,
          },
        },
      ]),
      new LogicComponent([
        Background,
        {
          props: {
            backgroundSprite: this.backgroundSprite,
          },
        },
      ]),
      new BulletPrefab({
        props: {
          sprite: this.bulletSprite,
        },
      }),
      new EnemyPrefab({
        props: {
          destroyedSound: this.enemyDestroyedSound,
          levels: this.enemyLevels,
          weights: this.enemyWeights,
        },
      }),
      new MoneyItemPrefab({
        props: {
          sprite: this.moneySprite,
        },
      }),
      new LogicComponent([
        Player,
        {
          props: {
            shootSound: this.shootSound,
            pickItemSound: this.pickItemSound,
            hp: this.playerHP,
            money: this.playerMoney,
            playerSprite: this.playerSprite,
          },
        },
      ]),
      new LogicComponent([
        EnemySpawner,
        {
          props: {
            enemyPerSeconds: 0.3,
            waveDuration: 10,
            waves: [
              {
                amountEnemies: 5,
              },
              {
                amountEnemies: 8,
              },
            ],
          },
        },
      ]),
    ];
  }
}
