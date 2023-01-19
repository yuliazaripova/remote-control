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
  const position = await mouse.getPosition();
  const { x, y } = position;

  console.log(x, y);
  const x0 = x - width;
  const y0 = y;
  let R = width,
    A = 0,
    PI2 = Math.PI * 2,
    dA = PI2 / 64;
  let x1 = x0 + R * Math.cos(A);
  let y1 = y0 + R * Math.sin(A);

  //sxs   console.log({ x0, x1, y0, y1 });
  let flag = x1;
  let i = 0;
  while (true) {
    console.log({ A });
    if (i === 66) {
      break;
    } else {
      console.log({ flag, x1, i });

      await mouse.move(straightTo({ x: x1, y: y1 }));
      x1 = x0 + R * Math.cos(A);
      y1 = y0 + R * Math.sin(A);
      A += dA;
      if (A >= PI2) A -= PI2;
      else if (A < 0) A += PI2;
      flag = x1;
      console.log({ x, x1, y, y1 });
      i++;
    }
  }
};
