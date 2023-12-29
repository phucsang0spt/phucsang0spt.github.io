window.board = document.getElementById("board");
window.fan = document.getElementById("fan");
window.dragger = document.getElementById("fan-dragger");
window.startButton = document.getElementById("start-button");

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function disableScroll() {
  document.body.style.overflow = "hidden";
}

function enableScroll() {
  document.body.style.overflow = "unset";
}
