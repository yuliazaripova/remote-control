import { RawData } from "ws";
import COMMANDS from "../constants/commands";
import { drawCircle, drawRectangle } from "../drawing/drawing";
import {
  getMousePosition,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from "../navigation/navigation";
import { getPrintScreen, prepareBase64 } from "../print/print";

const getParams = (data: RawData): [string, number, number] => {
  const [command, _width, _length] = data.toString().split(" ");

  const width = Number(_width);
  const length = Number(_length);
  return [command, width, length];
};

const formatArg = (arg: number) => `${arg ? "_" + arg : ""}`;

const sendCommand = (
  command: string,
  width: number,
  length: number,
  ws: any
) => {
  const res = command + formatArg(width) + formatArg(length);
  ws.send(res);
  console.log({
    command,
    result: res,
  });
};

const logCommand = (
  command: string,
  width: number,
  length: number,
  ws: any
) => {
  if (!(command === COMMANDS.POS || command === COMMANDS.PRNT)) {
    sendCommand(command, width, length, ws);
  }
};

const handleCommand = async (
  command: string,
  width: number,
  length: number,
  ws: any
) => {
  if (command === COMMANDS.POS) {
    const { x, y } = await getMousePosition();
    ws.send(`mouse_position ${x},${y}`);
  }
  if (command === COMMANDS.PRNT) {
    const res = await getPrintScreen();
    ws.send(`prnt_scrn ${prepareBase64(res)}`);
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
  logCommand(command, width, length, ws);
};

export const handleWsData = (data: RawData, ws: any) => {
  const [command, width, length] = getParams(data);
  handleCommand(command, width, length, ws);
};
