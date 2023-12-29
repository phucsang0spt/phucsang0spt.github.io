(function () {
  const holder = document.getElementById("fan-dragger-holder");

  const styled = getComputedStyle(holder);
  const holderHeight = +styled.getPropertyValue("--fan-dragger-holder-height");

  dragger.onDrag = () => {};

  dragger.getHolderHeight = () => {
    return holderHeight;
  };

  dragger.setPosition = (y) => {
    let _y = Math.min(y, holderHeight);
    _y = Math.max(_y, 0);
    holder.style.setProperty("--fan-dragger-y", _y);
    return _y;
  };

  function handleDown(e) {
    dragger.prevPointer = { x: e.clientX, y: e.clientY };
    dragger.captured = true;
    disableScroll();
  }
  function handleMove(e) {
    if (!dragger.captured) {
      return;
    }
    const clientX = e.clientX;
    const clientY = e.clientY;
    const { x: prevClientX, y: prevClientY } = dragger.prevPointer || {
      x: clientX,
      y: clientY,
    };

    const deltaY = clientY - prevClientY;

    const styled = getComputedStyle(holder);
    const currY = +styled.getPropertyValue("--fan-dragger-y");

    const newY = dragger.setPosition(currY + deltaY * 1.1);

    dragger.prevPointer = {
      x: clientX,
      y: clientY,
    };

    dragger.onDrag(newY / holderHeight);
  }
  function handleUp() {
    enableScroll();
    dragger.prevPointer = undefined;
    dragger.captured = false;
  }
  dragger.addEventListener("pointerdown", handleDown);
  dragger.addEventListener("pointermove", handleMove);
  dragger.addEventListener("pointerup", handleUp);
  dragger.addEventListener("pointerout", handleUp);
})();
