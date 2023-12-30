(function () {
  const BALL_SIZE = 40;
  const COLORS = [
    "#2980b9",
    "#8e44ad",
    "#2ecc71",
    "#1abc9c",
    "#f1c40f",
    "#e74c3c",
    "#ecf0f1",
  ];

  const randRange = (min, max) => Math.random() * (max - min + 1) + min;
  const randColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

  function generateBall() {
    return new Ball(
      randRange(BALL_SIZE * 10, board.w - BALL_SIZE),
      randRange(-BALL_SIZE * 3, -BALL_SIZE * 1.2),
      randColor(),
      BALL_SIZE
    );
  }

  function spawnBalls() {
    const newBalls = Array.from({ length: 7 }).map(() => generateBall());
    for (const ball of newBalls) {
      if (board.balls.length > 100) {
        return;
      }

      ball.addForce(0, randRange(0.1, 1));
      board.balls.push(ball);
    }
  }

  function spawnGrounds() {
    board.grounds.push(
      new Ground(board.w / 2 + 80, board.h - 100, 0.9 * board.w, 5)
    );
    board.grounds.push(new Ground(board.w - 100, 300, 200, 5));

    board.movingGround = new Ground(200, 150, 5, 300);
    board.movingGround.g = 0;
    board.grounds.push(board.movingGround);
  }

  function speedToWindForce(sp) {
    return -0.03 * sp;
  }

  fan.onSpeedChange = (speed) => {
    board.wind.x = speedToWindForce(speed);
    board.wind.y = 0.6 * board.wind.x; // a bit push up
  };

  startButton.onclick = () => {
    start();
    startButton.style.display = "none";
  };

  function start() {
    board.balls = [];
    board.grounds = [];
    board.wind = PhysicEntity.makeVector();

    spawnGrounds();

    spawnBalls();
    setInterval(() => spawnBalls(), 1000);

    board.lastTime = new Date().getTime();
    board.deltaTime = 0;

    fan.start();
    loop();
  }

  function update() {
    const currentTime = new Date().getTime();
    board.deltaTime = currentTime - board.lastTime;
    board.lastTime = currentTime;

    const wind = board.wind;

    for (let index = 0; index < board.balls.length; index++) {
      const ball = board.balls[index];
      if (ball.y > 50 && ball.y <= 300) {
        ball.addForce(wind.x * randRange(1, 2), wind.y * randRange(1, 2));
      }
      ball.loop();
      if (ball.isDead) {
        ball.destroy(index);
        index--;
      }
    }

    const movingGround = board.movingGround;
    let dir = 0;
    if (movingGround.y <= -movingGround.height / 2) {
      dir = 2;
      movingGround.addForce(0, dir);
    } else if (movingGround.y >= movingGround.height / 2) {
      dir = -2;
      movingGround.addForce(0, dir);
    }
    movingGround.loop();
  }

  function loop() {
    if (board.paused) {
      return;
    }
    update();
    requestAnimationFrame(loop);
  }
})();
