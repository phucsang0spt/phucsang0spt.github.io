const world = new World();

function initial() {
  const groundWidth = 250;
  const groundGap = 80;
  const amountOfGround = Math.ceil(canvas.width / (groundWidth + groundGap));

  for (const i in Array.from({ length: amountOfGround })) {
    const ground = new Ground(
      (groundWidth + groundGap) * i,
      0,
      groundWidth,
      40
    ).onBind((obj) => {
      obj.setY(canvas.height - obj.height - 50 - Math.random() * 100);
    });
    world.addEntity(ground);
  }

  for (const i in Array.from({ length: amountOfGround })) {
    if (
      [
        Math.floor(Math.random() * 3),
        Math.floor(Math.random() * amountOfGround.length),
      ].includes(+i)
    ) {
      const ground = new Ground(
        (groundWidth + groundGap) * i,
        world.entities[i].y,
        groundWidth,
        40
      ).onBind((obj) => {
        obj.setY(obj.y - obj.height - 100 - Math.random() * 100);
      });
      world.addEntity(ground);
    }
  }

  const cumer = new BallsCumer(canvas.width / 2, 0);
  world.addEntity(cumer);

  setInterval(() => {
    for (const entity of world.entities) {
      if (entity.tag === "ground") {
        const force = {
          x: getRandomArbitrary(-0.2, 0.2),
          y: getRandomArbitrary(-0.4, 0.4),
        };
        entity.addForce(force);
        if (entity.y + entity.vec.y > canvas.height) {
          entity.addForce({
            x: 0,
            y: -1,
          });
        }

        if (entity.y + entity.vec.y < canvas.height / 2) {
          entity.addForce({
            x: 0,
            y: 1,
          });
        }

        if (entity.x + entity.vec.y < 0) {
          entity.addForce({
            x: 1,
            y: 0,
          });
        }
        if (entity.x + entity.vec.y > canvas.width) {
          entity.addForce({
            x: -1,
            y: 0,
          });
        }
      }
    }
  }, 1000);

  window.addEventListener(
    "onWind",
    function (e) {
      for (const entity of world.entities) {
        if (entity.tag === "ball") {
          entity.addForce({
            x: -5,
            y: Math.random() * 1,
          });
        }
      }
    },
    false
  );
}

function loop() {
  requestAnimationFrame(loop);
  world.update();
  world.draw();
}

(function bootstrap() {
  initial();
  loop();
})();
