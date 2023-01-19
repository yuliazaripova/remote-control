import { RawData } from "ws";
import COMMANDS from "../constants/commands";
import { drawCircle, drawRectangle } from "../drawing/drawing";
import {
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from "../navigation/navigation";

const getParams = (data: RawData): [string, number, number] => {
  const [command, _width, _length] = data.toString().split(" ");

  const width = Number(_width);
  const length = Number(_length);
  return [command, width, length];
};

const handleCommand = async (
  command: string,
  width: number,
  length: number
) => {
  if (command === COMMANDS.PRNT) {
    let i;
    //    const img = await screen.capture("./").then((im) => ws.send(im));
  }

  if (command === COMMANDS.UP) {
    await moveUp(width);
  }
  if (command === COMMANDS.DOWN) {
    await moveDown(width);
  }
  if (command === COMMANDS.LEFT) {
    await moveLeft(width);
  }
  if (command === COMMANDS.RIGHT) {
    await moveRight(width);
  }
  if (command === COMMANDS.SQUARE) {
    await drawRectangle(width, width);
  }
  if (command === COMMANDS.REC) {
    await drawRectangle(width, length);
  }
  if (command === COMMANDS.CIRCLE) {
    await drawCircle(width);
  }
};

export const handleWsData = (data: RawData) => {
  const [command, width, length] = getParams(data);
  handleCommand(command, width, length);
};
