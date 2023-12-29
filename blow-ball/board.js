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

  board.balls = [];
  board.ground = null;
  board.wind = 0;
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
    const newBalls = Array.from({ length: 10 }).map(() => generateBall());
    for (const ball of newBalls) {
      ball.addForce(0, randRange(0.1, 1));
      board.balls.push(ball);
      if (board.balls.length > 100) {
        board.balls[0].destroy();
      }
    }
  }

  function speedToWindForce(sp) {
    return -0.03 * sp;
  }

  fan.onSpeedChange = (speed) => {
    board.wind = speedToWindForce(speed);
  };

  function start() {
    board.ground = new Ground(
      board.w / 2 + 80,
      board.h - 100,
      0.9 * board.w,
      5
    );
    const balls = [];
    board.balls = balls;
    spawnBalls();
    setInterval(() => spawnBalls(), 1000);
  }

  function update() {
    if (board.paused) {
      return;
    }
    const wind = board.wind;
    for (const ball of board.balls) {
      if (ball.y > 50 && ball.y <= 300) {
        ball.addForce(wind);
      }
      ball.loop();
    }
  }

  function loop() {
    requestAnimationFrame(loop);
    update();
  }

  startButton.onclick = () => {
    start();
    startButton.style.display = "none";
  };

  fan.start();
  loop();
})();
