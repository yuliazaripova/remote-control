import { RawData } from "ws";
import { Region, screen } from "@nut-tree/nut-js";
import COMMANDS from "../constants/commands";
import { drawCircle, drawRectangle } from "../drawing/drawing";
import {
  getMousePosition,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from "../navigation/navigation";
import { createReadStream, readFile } from "fs";
import Jimp from "jimp";

const getParams = (data: RawData): [string, number, number] => {
  const [command, _width, _length] = data.toString().split(" ");

  const width = Number(_width);
  const length = Number(_length);
  return [command, width, length];
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
    const r = new Region(100, 100, 100, 100);
    const img = await screen.grabRegion(r);
    const _img = await img.toRGB();
    const q = new Jimp(_img).rgba(true);
    const a = await Jimp.read(q);
    const a1 = await a.getBase64Async(Jimp.MIME_PNG);

    ws.send(`prnt_scrn ${a1.replace(/^data:image\/png;base64,/, "")}`);
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

export const handleWsData = (data: RawData, ws: any) => {
  const [command, width, length] = getParams(data);
  handleCommand(command, width, length, ws);
};
function base64ToPage(base64: string) {
  throw new Error("Function not implemented.");
}
