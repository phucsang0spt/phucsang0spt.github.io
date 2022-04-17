import { EntitySuit } from "../classes/EntitySuit";

export function Tag(tag: string) {
  return function (target: { new (): EntitySuit }) {
    (target as any).tag = tag;
  };
}
