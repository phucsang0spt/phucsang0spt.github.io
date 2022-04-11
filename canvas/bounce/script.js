const worldObjects = [];

function initial() {
  const ground1 = new Ground(50, 0, 400, 50).onBind((obj) => {
    obj.setY(canvas.height - obj.height - 100);
  });
  const ground2 = new Ground(500, 0, 400, 50).onBind((obj) => {
    obj.setY(canvas.height - obj.height - 180);
  });

  const block = new Block(ground1.x + ground2.width / 2, 0, 50, 50).onBind(
    (obj) => {
      obj.setY(ground1.y - obj.height - 100);
    }
  );
  window.block = block;

  const ball = new Ball(ground2.x + ground2.width / 2, 0, 25).onBind((obj) => {
    obj.setY(ground2.y - obj.height - 100);
  });

  worldObjects.push(block);
  worldObjects.push(ball);
  worldObjects.push(ground1);
  worldObjects.push(ground2);

  let lastGrond = ground2;
  for (const i in Array.from({ length: 4 })) {
    lastGrond = new Ground(
      20 + (lastGrond.x + lastGrond.width),
      0,
      200,
      50
    ).onBind((obj) => {
      obj.setY(canvas.height - obj.height - 100);
    });
    worldObjects.push(lastGrond);
  }
  for (const worldObject of worldObjects) {
    worldObject.initial();
  }
}

function blowWind() {
  for (const worldObject of worldObjects) {
    if (worldObject.tag === "block" || worldObject.tag === "ball") {
      worldObject.vec.x += 2;

      setTimeout(() => {
        worldObject.vec.x = 0;
      }, 1000);
    }
  }
}

function onUpdate() {
  for (const worldObject of worldObjects) {
    worldObject.update();
    for (const subWorldObject of worldObjects) {
      if (worldObject !== subWorldObject) {
        worldObject.checkCollision(subWorldObject);
      }
    }
    worldObject.lastCollTargets = {};
  }
}

function onDraw() {
  ctx.fillStyle = "#292929";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (const worldObject of worldObjects) {
    worldObject.draw();
  }
}

function loop() {
  requestAnimationFrame(loop);
  onUpdate();
  onDraw();
}

(function bootstrap() {
  initial();
  loop();
})();
