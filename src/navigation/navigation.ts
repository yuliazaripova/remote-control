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
import COMMANDS from "../constants/commands";

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

export const getMousePosition = async () => {
  const position = await mouse.getPosition();
  const { x, y } = position;
  console.log({
    command: COMMANDS.POS,
    result: `mouse_position ${x},${y}`,
  });
  return { x, y };
};
