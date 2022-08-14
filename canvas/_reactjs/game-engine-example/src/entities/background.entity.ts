import {
  AvatarSprite,
  LogicComponent,
  RectEntity,
} from "react-simple-game-engine";

import {
  Avatar,
  EntityPrepare,
} from "react-simple-game-engine/lib/export-types";

type Props = {
  backgroundSprite: Avatar;
};
export class Background extends RectEntity<Props> {
  protected onPrepare(): EntityPrepare<this> {
    return {
      sprite: new LogicComponent([
        AvatarSprite,
        {
          source: this.props.backgroundSprite,
        },
      ]),
      transform: {
        x: Renderer.scaler.gameSize.width / 2,
        y: Renderer.scaler.gameSize.height / 2,
        width: Renderer.scaler.gameSize.width,
        height: Renderer.scaler.gameSize.height,
      },
      bodyOptions: {
        isSensor: true,
        isStatic: true,
      },
    };
  }
}
