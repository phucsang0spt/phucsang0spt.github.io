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
