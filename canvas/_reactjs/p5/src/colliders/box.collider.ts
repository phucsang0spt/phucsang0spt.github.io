import { CircleEntity } from "../classes/CircleEntity";
import { EntitySuit } from "../classes/EntitySuit";
import { RectEntity } from "../classes/RectEntity";
import { BaseCollider } from "./base.collider";
import { CircleCollider } from "./circle.collider";

export class BoxCollider extends BaseCollider {
  private width!: number;
  private height!: number;

  onSetMaster(master: EntitySuit): void {
    if (master instanceof RectEntity) {
      this.width = master.width;
      this.height = master.height;
    } else if (master instanceof CircleEntity) {
      this.width = master.radius;
      this.height = master.radius;
    }
  }

  isCollision(target: BaseCollider): boolean {
    if (target instanceof CircleCollider) {
      const { Position: targetPosition, radius: targetRadius } = target;
      return (
        this.position.x + this.width >= targetPosition.x - targetRadius &&
        this.position.x <= targetPosition.x + targetRadius &&
        this.position.y + this.height >= targetPosition.y - targetRadius &&
        this.position.y <= targetPosition.y + targetRadius
      );
    }
    if (target instanceof BoxCollider) {
      const {
        Position: targetPosition,
        width: targetWidth,
        height: targetHeight,
      } = target;
      return (
        this.position.x + this.width >= targetPosition.x &&
        this.position.x <= targetPosition.x + targetWidth &&
        this.position.y + this.height >= targetPosition.y &&
        this.position.y <= targetPosition.y + targetHeight
      );
    }
    return false;
  }

  private isHorTouchWithBoxOk(target: BoxCollider) {
    const { Position: targetPosition } = target;
    let isOk = false;
    const deltaX = Math.abs(this.position.x + this.width - targetPosition.x);
    if (
      this.position.y < targetPosition.y &&
      this.position.y + this.height > targetPosition.y
    ) {
      const deltaY = Math.abs(this.position.y + this.height - targetPosition.y);
      isOk = deltaX < deltaY;
    } else if (
      this.position.y + this.height > targetPosition.y &&
      this.position.y < targetPosition.y + target.height
    ) {
      const deltaY = Math.abs(
        this.position.y - (targetPosition.y + target.height)
      );
      isOk = deltaX < deltaY;
    }
    return isOk;
  }

  private isVerTouchWithBoxOk(target: BoxCollider) {
    const { Position: targetPosition } = target;
    let isOk = false;
    const deltaY = Math.abs(
      this.position.y - (targetPosition.y + target.height)
    );
    if (
      this.position.x < targetPosition.x &&
      this.position.x + this.width > targetPosition.x
    ) {
      const deltaX = Math.abs(this.position.x + this.width - targetPosition.x);
      isOk = deltaY < deltaX;
    } else if (
      this.position.x + this.width > targetPosition.x &&
      this.position.x < targetPosition.x + target.width
    ) {
      const deltaX = Math.abs(
        this.position.x - (targetPosition.x + target.width)
      );
      isOk = deltaY < deltaX;
    }
    return isOk;
  }

  private isHorTouchWithCircleOk(target: CircleCollider) {
    const { Position: targetPosition } = target;
    let isOk = false;
    const deltaX = Math.abs(
      this.position.x + this.width - (targetPosition.x - target.radius)
    );
    if (
      this.position.y < targetPosition.y - target.radius &&
      this.position.y + this.height > targetPosition.y - target.radius
    ) {
      const deltaY = Math.abs(
        this.position.y + this.height - (targetPosition.y - target.radius)
      );
      isOk = deltaX < deltaY;
    } else if (
      this.position.y + this.height > targetPosition.y - target.radius &&
      this.position.y < targetPosition.y + target.radius
    ) {
      const deltaY = Math.abs(
        this.position.y - (targetPosition.y + target.radius)
      );
      isOk = deltaX < deltaY;
    }
    return isOk;
  }

  private isVerTouchWithCircleOk(target: CircleCollider) {
    const { Position: targetPosition } = target;
    let isOk = false;
    const deltaY = Math.abs(
      this.position.y - (targetPosition.y + target.radius)
    );
    if (
      this.position.x < targetPosition.x - target.radius &&
      this.position.x + this.width > targetPosition.x - target.radius
    ) {
      const deltaX = Math.abs(
        this.position.x + this.width - (targetPosition.x - target.radius)
      );
      isOk = deltaY < deltaX;
    } else if (
      this.position.x + this.width > targetPosition.x - target.radius &&
      this.position.x < targetPosition.x + target.radius
    ) {
      const deltaX = Math.abs(
        this.position.x - (targetPosition.x + target.radius)
      );
      isOk = deltaY < deltaX;
    }
    return isOk;
  }

  bouncing(target: BaseCollider) {
    if (target instanceof BoxCollider) {
      const { Position: targetPosition } = target;
      const newObjectPosition = {
        x: this.master.Position.x,
        y: this.master.Position.y,
      };

      const newObjectVec = {
        x: this.master.V.x,
        y: this.master.V.y,
      };

      //left
      if (
        this.master.V.x > 0 &&
        this.position.x < targetPosition.x &&
        this.position.x + this.width >= targetPosition.x &&
        this.position.x + this.width + this.master.V.x >= targetPosition.x
      ) {
        if (this.isHorTouchWithBoxOk(target) || !this.master.V.y) {
          newObjectPosition.x = targetPosition.x - this.width - 0.1;
          newObjectVec.x = 0;
        }
      }

      //right
      if (
        this.master.V.x < 0 &&
        this.position.x + this.width > targetPosition.x + target.width &&
        this.position.x <= targetPosition.x + target.width &&
        this.position.x + this.master.V.x <= targetPosition.x + target.width
      ) {
        if (this.isHorTouchWithBoxOk(target) || !this.master.V.y) {
          newObjectPosition.x = targetPosition.x + target.width + 0.1;
          newObjectVec.x = 0;
        }
      }

      //top
      if (
        this.master.V.y < 0 &&
        this.position.y + this.height > targetPosition.y + target.height &&
        this.position.y <= targetPosition.y + target.height &&
        this.position.y + this.master.V.y <= targetPosition.y + target.height
      ) {
        if (this.isVerTouchWithBoxOk(target) || !this.master.V.x) {
          newObjectVec.y = 0;
          newObjectPosition.y = targetPosition.y + target.height + 0.1;
        }
      }

      //bottom
      if (
        this.master.V.y > 0 &&
        this.position.y < targetPosition.y &&
        this.position.y + this.height >= targetPosition.y &&
        this.position.y + this.height + this.master.V.y >= targetPosition.y
      ) {
        if (this.isVerTouchWithBoxOk(target) || !this.master.V.x) {
          newObjectVec.y = 0;
          newObjectPosition.y = targetPosition.y - this.height - 0.1;
        }
      }

      this.master.Position.x = newObjectPosition.x;
      this.position.x = newObjectPosition.x;

      this.master.Position.y = newObjectPosition.y;
      this.position.y = newObjectPosition.y;

      this.master.V.x = newObjectVec.x;
      this.master.V.y = newObjectVec.y;
    }

    if (target instanceof CircleCollider) {
      const { Position: targetPosition } = target;
      const newObjectPosition = {
        x: this.master.Position.x,
        y: this.master.Position.y,
      };

      const newObjectVec = {
        x: this.master.V.x,
        y: this.master.V.y,
      };

      //left
      if (
        this.master.V.x > 0 &&
        this.position.x < targetPosition.x - target.radius &&
        this.position.x + this.width >= targetPosition.x - target.radius &&
        this.position.x + this.width + this.master.V.x >=
          targetPosition.x - target.radius
      ) {
        if (this.isHorTouchWithCircleOk(target) || !this.master.V.y) {
          newObjectPosition.x =
            targetPosition.x - target.radius - this.width - 0.1;
          newObjectVec.x = 0;
        }
      }

      //right
      if (
        this.master.V.x < 0 &&
        this.position.x + this.width > targetPosition.x + target.radius &&
        this.position.x <= targetPosition.x + target.radius &&
        this.position.x + this.master.V.x <= targetPosition.x + target.radius
      ) {
        if (this.isHorTouchWithCircleOk(target) || !this.master.V.y) {
          newObjectPosition.x = targetPosition.x + target.radius + 0.1;
          newObjectVec.x = 0;
        }
      }

      //top
      if (
        this.master.V.y < 0 &&
        this.position.y + this.height > targetPosition.y + target.radius &&
        this.position.y <= targetPosition.y + target.radius &&
        this.position.y + this.master.V.y <= targetPosition.y + target.radius
      ) {
        if (this.isVerTouchWithCircleOk(target) || !this.master.V.x) {
          newObjectVec.y = 0;
          newObjectPosition.y = targetPosition.y + target.radius + 0.1;
        }
      }

      //bottom
      if (
        this.master.V.y > 0 &&
        this.position.y < targetPosition.y - target.radius &&
        this.position.y + this.height >= targetPosition.y - target.radius &&
        this.position.y + this.height + this.master.V.y >=
          targetPosition.y - target.radius
      ) {
        if (this.isVerTouchWithCircleOk(target) || !this.master.V.x) {
          newObjectVec.y = 0;
          newObjectPosition.y =
            targetPosition.y - target.radius - this.height - 0.1;
        }
      }

      this.master.Position.x = newObjectPosition.x;
      this.position.x = newObjectPosition.x;

      this.master.Position.y = newObjectPosition.y;
      this.position.y = newObjectPosition.y;

      this.master.V.x = newObjectVec.x;
      this.master.V.y = newObjectVec.y;
    }
  }

  onDraw(): void {
    ctx.fill(1, 1, 1, 0);
    ctx.stroke(46, 204, 113);
    ctx.strokeWeight(1);
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
  }
}
