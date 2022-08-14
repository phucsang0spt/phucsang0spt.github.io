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
        x: Renderer.gameWidth / 2,
        y: Renderer.gameHeight / 2,
        width: Renderer.gameWidth,
        height: Renderer.gameHeight,
      },
      bodyOptions: {
        isSensor: true,
        isStatic: true,
      },
    };
  }
}
