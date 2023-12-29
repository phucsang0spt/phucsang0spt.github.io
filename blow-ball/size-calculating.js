function sizeCalculating() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const rootW = 1366;
  const rootH = 768;
  const rootRatio = rootH / rootW;
  document.body.style.setProperty("--root-w", rootW);
  document.body.style.setProperty("--root-h", rootH);
  document.body.style.setProperty("--root-ratio", rootH / rootW);

  let calcW, calcH;
  if (rootW > screenWidth) {
    calcW = screenWidth;
    calcH = calcW * rootRatio;
    if (calcH > screenHeight) {
      calcH = screenHeight;
      calcW = calcH / rootRatio;
    }
  } else if (rootH > screenHeight) {
    calcH = screenHeight;
    calcW = calcH / rootRatio;
    if (calcW > screenWidth) {
      calcW = screenWidth;
      calcH = calcW * rootRatio;
    }
  } else {
    calcW = rootW;
    calcH = rootH;
  }
  document.body.style.setProperty("--root-scale-x", calcW / rootW);
  document.body.style.setProperty("--root-scale-y", calcH / rootH);

  window.board.w = rootW - 200;
  window.board.h = rootH;
}
sizeCalculating();
window.addEventListener("resize", sizeCalculating);
