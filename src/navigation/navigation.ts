import {
  mouse,
  left,
  right,
  up,
  down,
  straightTo,
  screen,
  Image,
  imageResource,
} from "@nut-tree/nut-js";

export const moveUp = async (y: number) => {
  await mouse.move(up(y));
};

export const moveDown = async (y: number) => {
  await mouse.move(down(y));
};

export const moveLeft = async (x: number) => {
  await mouse.move(left(x));
};

export const moveRight = async (x: number) => {
  await mouse.move(right(x));
};
