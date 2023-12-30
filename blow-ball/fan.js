(function () {
  fan.onSpeedChange = () => {};

  const styled = getComputedStyle(fan);

  const minSpeed = styled.getPropertyValue("--min-fan-speed");
  const maxSpeed = styled.getPropertyValue("--max-fan-speed");

  setFanSpeed = (sp) => {
    let _s = Math.min(sp, maxSpeed);
    _s = Math.max(_s, minSpeed);
    fan.style.setProperty("--current-fan-speed", _s);
  };

  function speedToPosition(sp) {
    const rate = sp / maxSpeed;
    return rate * dragger.getHolderHeight();
  }

  function setDefaultSpeed(sp) {
    const defaultSpeed = sp;
    setFanSpeed(defaultSpeed);
    dragger.setPosition(speedToPosition(defaultSpeed));
    fan.onSpeedChange(defaultSpeed);
  }

  // listen dragger
  dragger.onDrag = (rate) => {
    const speed = rate * maxSpeed;
    setFanSpeed(speed);

    fan.onSpeedChange(speed);
  };

  fan.start = (sp = 0.5) => {
    setDefaultSpeed(sp);
  };
})();
