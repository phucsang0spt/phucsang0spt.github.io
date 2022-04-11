class BallsCumer extends Rectangle {
  constructor(x, y) {
    super(x, y, 10, 10);
  }

  onInitial() {
    setInterval(() => {
      const ball = new Ball(this.x, this.y, 15, {
        x: getRandomArbitrary(-3, 3),
        y: Math.random() * 2,
      });
      this.world.addEntity(ball);
      ball.color = getRndColor();
    }, 500);
  }

  onUpdate() {}
}
