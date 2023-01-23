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
import {
  getMousePosition,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from "../navigation/navigation";

export const drawRectangle = async (x: number, y: number) => {
  await moveLeft(x);
  await moveUp(y);
  await moveRight(x);
  await moveDown(y);
};

export const drawCircle = async (width: number) => {
  const { x, y } = await getMousePosition();
  const x0 = x - width / 2;
  const y0 = y;
  let R = width / 2,
    A = 0,
    PI2 = Math.PI * 2,
    dA = PI2 / 64;
  let x1 = x0 + R * Math.cos(A);
  let y1 = y0 + R * Math.sin(A);

  let flag = x1;
  let i = 0;
  while (true) {
    if (i === 66) {
      break;
    } else {
      await mouse.move(straightTo({ x: x1, y: y1 }));
      x1 = x0 + R * Math.cos(A);
      y1 = y0 + R * Math.sin(A);
      A += dA;
      if (A >= PI2) A -= PI2;
      else if (A < 0) A += PI2;
      flag = x1;
      i++;
    }
  }
};
