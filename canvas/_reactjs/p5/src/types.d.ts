declare interface Window {
  ctx: import("p5");
}

declare var ctx: import("p5");

type Vector = import("p5").Vector;
type Color = [number, number, number, number?];

type EntitySuit = import("./classes/EntitySuit").EntitySuit;

type Actor<E = EntitySuit> = E | [E, (entity: E) => void];
