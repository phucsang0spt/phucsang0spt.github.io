import { RectEntity, Sound } from "react-simple-game-engine";

import { EntityPrepare } from "react-simple-game-engine/lib/export-types";

type Props = {
  backgroundMusic: Sound;
  winSound: Sound;
  loseSound: Sound;
};
export class Manager extends RectEntity<Props> {
  protected onPrepare(): EntityPrepare<this> {
    return {
      name: "manager",
      bodyOptions: {
        isSensor: true,
        isStatic: true,
      },
    };
  }

  stopGame() {
    this.props.backgroundMusic.stop();
    setTimeout(() => {
      Renderer.running = false;
    }, 0);
  }

  lose() {
    this.stopGame();
    this.props.loseSound.playNow();
    this.scene.emitEntityPropsChange("result", {
      isWin: false,
    });
  }

  win() {
    this.stopGame();
    this.props.winSound.play();
    this.scene.emitEntityPropsChange("result", {
      isWin: true,
    });
  }

  onActive(): void {
    this.scene.onProcessStateChangeListener((isFore) => {
      if (isFore) {
        this.props.backgroundMusic.play();
      } else {
        this.props.backgroundMusic.native.pause();
      }
    });
    this.props.backgroundMusic.play();
  }
}
